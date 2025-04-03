// src/hooks/useEpub.tsx
import JSZip from "jszip";
import { useState, useCallback } from "react";

type BlobImages = { [key: string]: string };

// Helper to resolve relative paths within the EPUB structure
function resolvePath(relativePath: string, basePath: string): string {
  if (!basePath) return relativePath; // If no base path, assume root relative
  // Basic resolution: Combine base path and relative path
  // More robust URL resolution is better, but this covers common cases.
  const combined = basePath + relativePath;
  // Handle '../' - This is a simplified version. A robust solution is more complex.
  const parts = combined.split("/");
  const resolvedParts = [];
  for (const part of parts) {
    if (part === "..") {
      resolvedParts.pop(); // Go up one level
    } else if (part !== "." && part !== "") {
      resolvedParts.push(part);
    }
  }
  return resolvedParts.join("/");
}

export default function useEpub() {
  const [rawContent, setRawContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null); // Exposed error state for the consumer

  // Internal state holders - reset on new load
  let currentZip: JSZip | null = null;
  let currentObfFolder = "";
  let currentImages: BlobImages = {};
  let currentStyle = "";
  let styleLinkElement: HTMLLinkElement | null = null;

  // Function called by the BokReader component to load the EPUB data
  const loadEpub = useCallback(async (source: File | ArrayBuffer) => {
    // Reset all state when loading a new source - CRITICAL for component reuse
    setIsLoading(true);
    setRawContent("");
    setTitle("Loading...");
    setError(null);
    currentZip = null;
    currentObfFolder = "";
    currentImages = {};
    currentStyle = "";
    if (styleLinkElement) {
      // Remove old styles
      document.head.removeChild(styleLinkElement);
      URL.revokeObjectURL(styleLinkElement.href); // Clean up blob URL
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
      // Use unknown instead of any for better type safety
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Error processing EPUB source:", err);
      setError(errorMessage || "Failed to load EPUB.");
      setRawContent(""); // Ensure content is empty on error
      setTitle("");
      setIsLoading(false);
    }
  }, []); // Empty dependency array ensures this function reference is stable

  async function readContainer() {
    if (!currentZip) throw new Error("Zip not loaded");

    const containerPath = "META-INF/container.xml";
    const containerFile = currentZip.file(containerPath);
    if (!containerFile) throw new Error("META-INF/container.xml not found.");

    const containerContent = await containerFile.async("text");
    const opfPath = getOpfPath(containerContent);
    if (!opfPath) throw new Error("OPF file path not found in container.xml.");

    currentObfFolder = opfPath.substring(0, opfPath.lastIndexOf("/") + 1); // Get directory containing OPF

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
    await parseManifestAndSpine(parsedOpf); // Process based on OPF data
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
    if (fullPath == null || fullPath == undefined) return null;
    else return fullPath;
  }

  function getTitle(opf: Document) {
    const titleElement =
      opf.querySelector("metadata > dc\\:title") ||
      opf.querySelector("metadata > title");
    setTitle(titleElement?.textContent || "Untitled Book");
  }

  async function parseManifestAndSpine(opf: Document) {
    if (!currentZip) return;

    // Map manifest items by ID for quick lookup
    const manifestItems: { [id: string]: { href: string; type: string } } = {};
    opf.querySelectorAll("manifest > item").forEach((item) => {
      const id = item.getAttribute("id");
      const href = item.getAttribute("href");
      const type = item.getAttribute("media-type");
      if (id && href && type) {
        manifestItems[id] = { href: decodeURIComponent(href), type };
      }
    });

    // Get spine order (reading order)
    const spineRefs = Array.from(opf.querySelectorAll("spine > itemref")).map(
      (ref) => ref.getAttribute("idref"),
    );

    let combinedContent = "";
    const loadedCssHrefs = new Set<string>(); // Track loaded CSS to avoid duplicates

    // Process spine items first for reading content
    for (const idref of spineRefs) {
      if (!idref) continue;
      const item = manifestItems[idref];
      if (item) {
        const itemPath = resolvePath(item.href, currentObfFolder);
        const itemFile = currentZip.file(itemPath);
        if (
          itemFile &&
          (item.type.includes("html") || item.type.includes("xml"))
        ) {
          // Process only text-based content files
          try {
            const itemContent = await itemFile.async("text");
            const processedContent = await processContentItem(
              itemContent,
              item.type,
            );
            combinedContent += `<div class="bok-chapter">${processedContent}</div>`; // Wrap each spine item
          } catch (e) {
            console.warn(`Failed to process spine item ${itemPath}:`, e);
          }
        }
      }
    }

    // Process manifest for CSS (needed even if not in spine)
    for (const id in manifestItems) {
      const item = manifestItems[id];
      if (item.type.includes("css")) {
        const cssPath = resolvePath(item.href, currentObfFolder);
        if (!loadedCssHrefs.has(cssPath)) {
          // Avoid loading same CSS file multiple times
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

    addStyling(); // Apply collected styles
    setRawContent(combinedContent);
    setIsLoading(false); // Finished loading
  }

  // Processes a single content item (HTML/XML) - removes inline styles and cleans images
  async function processContentItem(
    content: string,
    type: string,
  ): Promise<string> {
    let processed = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ""); // Remove inline <style> blocks
    processed = await cleanImagePaths(processed, type);
    return processed;
  }

  async function cleanImagePaths(
    document: string,
    type: string,
  ): Promise<string> {
    if (!currentZip || !(type.includes("html") || type.includes("xml"))) {
      return document; // Only process parsable types and if zip exists
    }

    try {
      const parser = new DOMParser();
      //@ts-expect-error trust me bro
      const newDocument = parser.parseFromString(document, type);
      const parserError = newDocument.querySelector("parsererror");
      if (parserError) {
        console.warn(
          "Parser error in content item, skipping image processing.",
        );
        return document; // Return original if parsing this specific item fails
      }

      const imageElements = Array.from(
        newDocument.querySelectorAll("img, image"),
      ); // Handle <img> and <image> (SVG)

      for (const img of imageElements) {
        const srcAttr =
          img.tagName.toLowerCase() === "img" ? "src" : "xlink:href";
        const src = img.getAttribute(srcAttr);

        if (src) {
          const absoluteSrc = resolvePath(src, currentObfFolder); // Resolve path relative to OPF directory

          if (currentImages[absoluteSrc] === undefined) {
            // Check cache only if not already processed (even if failed)
            const imgFile = currentZip.file(absoluteSrc);
            if (imgFile) {
              try {
                const blob = await imgFile.async("blob");
                const url = URL.createObjectURL(blob);
                currentImages[absoluteSrc] = url; // Cache successfully created blob URL
              } catch (e) {
                console.warn(`Could not load image blob ${absoluteSrc}:`, e);
                currentImages[absoluteSrc] = ""; // Cache failure as empty string
              }
            } else {
              console.warn(`Image file not found in zip: ${absoluteSrc}`);
              currentImages[absoluteSrc] = ""; // Cache failure as empty string
            }
          }

          // Set the resolved & cached path (even if empty string for broken images)
          img.setAttribute(srcAttr, currentImages[absoluteSrc]);
        }
      }
      // Serialize potentially modified document back to string
      const serializer = new XMLSerializer();
      // Handle potential differences in XML vs HTML serialization if needed, but this usually works
      return serializer.serializeToString(
        newDocument.documentElement || newDocument,
      );
    } catch (error) {
      console.error("Error during image path cleaning:", error);
      return document; // Return original on unexpected error
    }
  }

  function addStyling() {
    if (!currentStyle.trim()) return; // Don't add empty styles

    const styleBlob = new Blob([currentStyle], { type: "text/css" });
    const blobURL = URL.createObjectURL(styleBlob);

    styleLinkElement = document.createElement("link"); // Store reference to remove later
    styleLinkElement.href = blobURL;
    styleLinkElement.rel = "stylesheet";
    styleLinkElement.setAttribute("data-bok-reader-style", "true");

    document.head.appendChild(styleLinkElement);
  }

  return {
    title,
    rawContent,
    isLoading,
    error, // Expose error state
    loadEpub, // Expose the function to trigger loading
    // Note: setIsLoading is not exposed; loading is controlled internally by loadEpub
  };
}
