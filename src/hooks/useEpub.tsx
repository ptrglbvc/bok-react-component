import JSZip from "jszip";
import { ChangeEvent, useState } from "react";

type BlobImages = {
    [key: string]: string;
};

export default function useEpub() {
    let [rawContent, setRawContent] = useState("");
    let [isLoading, setIsLoading] = useState(false);
    let [title, setTitle] = useState("");
    let style = "";
    let obfFolder = "";
    let images: BlobImages = {};
    let zip: JSZip | null = null;

    const validTypes = [
        "text/html",
        "text/xml",
        "application/xml",
        "application/xhtml+xml",
        "image/svg+xml",
    ];

    function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
        setIsLoading(true);
        let reader = new FileReader();

        if (event.target.files && event.target.files.length > 0) {
            reader.readAsArrayBuffer(event.target.files[0]);
            reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
                let result = loadEvent.target?.result;
                if (result instanceof ArrayBuffer) {
                    handleEpub(result);
                }
            };
        }
    }

    function handleEpub(epub: ArrayBuffer) {
        JSZip.loadAsync(epub).then((content) => {
            zip = content;
            if (zip != null) {
                readContainer();
            } else {
                setRawContent("Error reading epub file");
                setIsLoading(false);
            }
        });
    }

    async function readContainer() {
        const containerPath = "META-INF/container.xml";
        try {
            const containerFile = (zip as JSZip).file(containerPath);
            if (containerFile) {
                const containerContent = await containerFile.async("text");
                let obfLocation = getObf(containerContent);
                if (obfLocation) {
                    obfFolder = getContainingFolder(obfLocation);
                    let obfFile = (zip as JSZip).file(obfLocation);
                    let opf = await obfFile?.async("text");
                    try {
                        let parser = new DOMParser();
                        let parsedOpf = parser.parseFromString(
                            opf as string,
                            "text/xml"
                        );
                        parseManifest(parsedOpf);
                        getTitle(parsedOpf);
                    } catch (err) {
                        console.log("error loading opf file: ", err);
                    }
                } else {
                    setRawContent("Error finding opf file");
                }
            }
        } catch (error) {
            console.error("Error reading EPUB contents:", error);
        }
    }

    function getTitle(opf: Document) {
        let titleElement = opf.querySelector("metadata title");
        if (titleElement) {
            setTitle(titleElement.textContent as string);
        }
    }

    function getObf(containterContent: string): string {
        let parser = new DOMParser();
        let containterDOM = parser.parseFromString(
            containterContent,
            "text/xml"
        );
        let rootfiles = containterDOM.querySelectorAll("rootfile");
        for (let rootfile of rootfiles) {
            if (
                rootfile.getAttribute("media-type") ===
                "application/oebps-package+xml"
            ) {
                let result = rootfile.getAttribute("full-path");
                if (result) return result;
            }
        }
        return "";
    }

    async function parseManifest(opf: Document) {
        const items = opf.querySelectorAll("manifest item"); // Correctly target <item> elements within <manifest>
        let contents = "";

        for (const item of items) {
            let itemLocation = item.getAttribute("href") as string;
            let itemType = item.getAttribute("media-type") as string;
            let itemFile = (zip as JSZip).file(obfFolder + itemLocation); // Use the variable correctly
            if (itemType.includes("image")) {
            } else if (itemType.includes("adobe-page-template")) {
            } else if (itemLocation.includes(".ncx")) {
            } else if (itemType.includes("css")) {
                if (itemFile) {
                    style += await itemFile.async("text");
                }
            } else {
                if (itemLocation) {
                    if (itemFile) {
                        let itemContents = await itemFile.async("text");
                        let cleanItemContents = await cleanImages(
                            itemContents,
                            itemType
                        );
                        let evenMoreCleanItemContents =
                            formatChapters(cleanItemContents);
                        let finalVersionISwear = removeInlineStyles(
                            evenMoreCleanItemContents
                        );
                        contents += finalVersionISwear; // Accumulate contents
                    }
                }
            }
        }
        // toggleFullScreen();
        addStyling();
        setRawContent(contents);
        setIsLoading(false);
    }

    function removeInlineStyles(chapter: string): string {
        const regex = /<style[^>]*>.*?<\/style>/gs;
        return chapter.replace(regex, "");
    }

    function formatChapters(content: string): string {
        return "<div class='book-chapter'>" + content + "</div>";
    }

    function getContainingFolder(location: string) {
        let fileName = location.split("/").slice(-1)[0];
        return location.replace(fileName, "");
    }

    async function cleanImages(document: string, type: any): Promise<string> {
        let parser = new DOMParser();

        if (validTypes.includes(type)) {
            let newDocument = parser.parseFromString(document, type);
            let imgs = newDocument.querySelectorAll("img");
            for (let img of imgs) {
                await formatImg(img);
            }
            let xmlImages = newDocument.querySelectorAll("image");
            for (let image of xmlImages) {
                await formatXMLImage(image);
            }

            let seri = new XMLSerializer();
            let newDoc = seri.serializeToString(newDocument);
            return newDoc;
        } else return document;
    }

    async function formatImg(img: Element) {
        let src = img.getAttribute("src") as string;
        while (src[0] === "." || src[0] === "/") src = src.slice(1);
        src = obfFolder + src;
        //@ts-ignore
        if (!images[src]) {
            //@ts-ignore
            let blob = await (zip as JSZip).file(src)?.async("blob");
            if (blob) {
                let url = URL.createObjectURL(blob);
                //@ts-ignore
                images[src] = url;
            }
        }
        img.setAttribute("src", images[src]);
    }

    async function formatXMLImage(image: Element) {
        let src = image.getAttribute("xlink:href") as string;
        while (src[0] === "." || src[0] === "/") src = src.slice(1);
        src = obfFolder + src;

        //@ts-ignore
        if (images[src]) {
            //@ts-ignore
            image.setAttribute("xlink:href", images[src]);
        } else {
            let blob = await (zip as JSZip).file(src)?.async("blob");
            if (blob) {
                let url = URL.createObjectURL(blob);
                //@ts-ignore
                images[src] = url;
            }
        }
        image.setAttribute("xlink:href", images[src]);
        image.setAttribute("border-radius", "20px");
        image.setAttribute("width", "70vw");
    }

    function addStyling() {
        let styleBlob = new Blob([style], { type: "text/css" });
        let blobURL = URL.createObjectURL(styleBlob);

        let link = document.createElement("link");
        link.href = blobURL;
        link.rel = "stylesheet";

        document.head.appendChild(link);
    }

    return { title, rawContent, isLoading, handleFileInput };
}
