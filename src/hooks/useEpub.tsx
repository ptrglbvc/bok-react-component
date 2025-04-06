// src/hooks/useEpub.tsx
import JSZip from "jszip";
import { useState, useCallback } from "react";

type BlobImages = { [key: string]: string };

export default function useEpub() {
  const [rawContent, setRawContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  let currentZip: JSZip | null = null;
  let currentObfFolder = "";
  let currentImages: BlobImages = {};
  let currentStyle = "";
  let styleLinkElement: HTMLLinkElement | null = null;

  const validTypes = [
    "text/html",
    "text/xml",
    "application/xml",
    "application/xhtml+xml",
    "image/svg+xml",
  ];

  const loadEpub = useCallback(async (source: File | ArrayBuffer) => {
    setIsLoading(true);
    setRawContent("");
    setTitle("Loading...");
    setError(null);
    currentZip = null;
    currentObfFolder = "";
    currentImages = {};
    currentStyle = "";
    if (styleLinkElement) {
      document.head.removeChild(styleLinkElement);
      URL.revokeObjectURL(styleLinkElement.href);
      styleLinkElement = null;
    }

    try {
      let buffer: ArrayBuffer;
      if (source instanceof File) {
        buffer = await source.arrayBuffer();
      } else {
        buffer = source;
      }
      currentZip = await JSZip.loadAsync(buffer);
      await readContainer();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Error processing EPUB source:", err);
      setError(errorMessage || "Failed to load EPUB.");
      setRawContent("");
      setTitle("");
      setIsLoading(false);
    }
  }, []);

  async function readContainer() {
    if (!currentZip) throw new Error("Zip not loaded");

    const containerPath = "META-INF/container.xml";
    const containerFile = currentZip.file(containerPath);
    if (!containerFile) throw new Error("META-INF/container.xml not found.");

    const containerContent = await containerFile.async("text");
    const opfPath = getOpfPath(containerContent);
    if (!opfPath) throw new Error("OPF file path not found in container.xml.");

    currentObfFolder = opfPath.substring(0, opfPath.lastIndexOf("/") + 1);

    const opfFile = currentZip.file(opfPath);
    if (!opfFile) throw new Error(`OPF file not found at path: ${opfPath}`);

    const opfContent = await opfFile.async("text");
    const parser = new DOMParser();
    const parsedOpf = parser.parseFromString(opfContent, "application/xml");

    const parserError = parsedOpf.querySelector("parsererror");
    if (parserError) {
      throw new Error(
        `Error parsing OPF file: ${parserError.textContent || "Unknown XML parse error"}`,
      );
    }

    getTitle(parsedOpf);
    await parseManifestAndSpine(parsedOpf);
  }

  function getOpfPath(containerContent: string): string | null {
    const parser = new DOMParser();
    const containerDOM = parser.parseFromString(
      containerContent,
      "application/xml",
    );
    const rootfile = containerDOM.querySelector(
      'rootfile[media-type="application/oebps-package+xml"]',
    );
    const fullPath = rootfile?.getAttribute("full-path");
    return fullPath ?? null;
  }

  function getTitle(opf: Document) {
    const titleElement =
      opf.querySelector("metadata > dc\\:title") ||
      opf.querySelector("metadata > title");
    setTitle(titleElement?.textContent || "Untitled Book");
  }

  async function parseManifestAndSpine(opf: Document) {
    if (!currentZip) return;

    const manifestItems: { [id: string]: { href: string; type: string } } = {};
    opf.querySelectorAll("manifest > item").forEach((item) => {
      const id = item.getAttribute("id");
      const href = item.getAttribute("href");
      const type = item.getAttribute("media-type");
      if (id && href && type) {
        manifestItems[id] = { href: decodeURIComponent(href), type };
      }
    });

    const spineRefs = Array.from(opf.querySelectorAll("spine > itemref")).map(
      (ref) => ref.getAttribute("idref"),
    );

    let combinedContent = "";
    const loadedCssHrefs = new Set<string>();

    for (const idref of spineRefs) {
      if (!idref) continue;
      const item = manifestItems[idref];
      if (item) {
        const itemFetchPath = currentObfFolder + item.href;
        const itemFile = currentZip.file(itemFetchPath);
        if (
          itemFile &&
          (item.type.includes("html") || item.type.includes("xml"))
        ) {
          try {
            const itemContent = await itemFile.async("text");
            const processedContent = await processContentItem(
              itemContent,
              item.type,
            );
            combinedContent += `<div class="bok-chapter">${processedContent}</div>`;
          } catch (e) {
            console.warn(`Failed to process spine item ${itemFetchPath}:`, e);
          }
        }
      }
    }

    for (const id in manifestItems) {
      const item = manifestItems[id];
      if (item.type.includes("css")) {
        const cssPath = currentObfFolder + item.href;
        if (!loadedCssHrefs.has(cssPath)) {
          const cssFile = currentZip.file(cssPath);
          if (cssFile) {
            try {
              currentStyle += (await cssFile.async("text")) + "\n";
              loadedCssHrefs.add(cssPath);
            } catch (e) {
              console.warn(`Failed to load CSS ${cssPath}:`, e);
            }
          }
        }
      }
    }

    addStyling();
    setRawContent(combinedContent);
    setIsLoading(false);
  }

  async function processContentItem(
    content: string,
    type: string,
  ): Promise<string> {
    let processed = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    processed = await cleanImages(processed, type);
    return processed;
  }

  // --- Image Logic with Error Handling ---

  async function cleanImages(document: string, type: string): Promise<string> {
    const parser = new DOMParser();

    if (validTypes.includes(type)) {
      try {
        // Error handling for DOM parsing/serialization
        const newDocument = parser.parseFromString(
          document,
          type as DOMParserSupportedType,
        );
        const parserError = newDocument.querySelector("parsererror");
        if (parserError) {
          // Error handling for malformed HTML/XML
          console.warn(
            "Parser error in content item during cleanImages, skipping.",
            parserError.textContent,
          );
          return document;
        }

        const imgs = newDocument.querySelectorAll("img");
        for (const img of imgs) {
          await formatImg(img);
        }
        const xmlImages = newDocument.querySelectorAll("image");
        for (const image of xmlImages) {
          await formatXMLImage(image);
        }

        const seri = new XMLSerializer();
        const newDoc = seri.serializeToString(
          newDocument.documentElement || newDocument,
        );
        return newDoc;
      } catch (error) {
        console.error("Error during cleanImages DOM processing:", error);
        return document;
      }
    } else return document;
  }

  async function formatImg(img: Element) {
    let src = img.getAttribute("src") as string;
    if (!src) return;

    while (src.startsWith(".") || src.startsWith("/")) src = src.slice(1);
    src = currentObfFolder + src;

    if (currentImages[src] === undefined) {
      const imgFile = currentZip?.file(src); // Error handling: Check if file exists
      if (imgFile) {
        try {
          // Error handling for blob creation
          const blob = await imgFile.async("blob");
          const url = URL.createObjectURL(blob);
          currentImages[src] = url;
        } catch (e) {
          console.warn(`Could not load image blob (formatImg) ${src}:`, e);
          currentImages[src] = ""; // Cache failure on error
        }
      } else {
        console.warn(`Image file not found in zip (formatImg): ${src}`);
        currentImages[src] = ""; // Cache failure if file not found
      }
    }
    img.setAttribute("src", currentImages[src]);
  }

  async function formatXMLImage(image: Element) {
    let src = image.getAttribute("xlink:href") as string;
    if (!src) return;

    while (src.startsWith(".") || src.startsWith("/")) src = src.slice(1);
    src = currentObfFolder + src;

    if (currentImages[src] === undefined) {
      const imgFile = currentZip?.file(src); // Error handling: Check if file exists
      if (imgFile) {
        try {
          // Error handling for blob creation
          const blob = await imgFile.async("blob");
          const url = URL.createObjectURL(blob);
          currentImages[src] = url;
        } catch (e) {
          console.warn(`Could not load image blob (formatXMLImage) ${src}:`, e);
          currentImages[src] = ""; // Cache failure on error
        }
      } else {
        console.warn(`Image file not found in zip (formatXMLImage): ${src}`);
        currentImages[src] = ""; // Cache failure if file not found
      }
    }
    image.setAttribute("xlink:href", currentImages[src]);
  }

  // --- End of Image Logic ---

  function addStyling() {
    if (!currentStyle.trim()) return;
    const styleBlob = new Blob([currentStyle], { type: "text/css" });
    const blobURL = URL.createObjectURL(styleBlob);
    styleLinkElement = document.createElement("link");
    styleLinkElement.href = blobURL;
    styleLinkElement.rel = "stylesheet";
    styleLinkElement.setAttribute("data-bok-reader-style", "true");
    document.head.appendChild(styleLinkElement);
  }

  return {
    title,
    rawContent,
    isLoading,
    error,
    loadEpub,
    setIsLoading,
  };
}
