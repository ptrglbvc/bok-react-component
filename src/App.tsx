import { useState, ChangeEvent } from "react";
import JSZip from "jszip";

function App() {
    let [container, setContainer] = useState<string | Document>("");
    let style = "";

    function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
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
            readContiner(content);
        });
    }

    async function readContiner(zip: JSZip) {
        const containerPath = "META-INF/container.xml";
        try {
            const containerFile = zip.file(containerPath);
            if (containerFile) {
                const containerContent = await containerFile.async("text");
                let obfLocation = getObf(containerContent);
                if (obfLocation != null) {
                    let folder = getContainingFolder(obfLocation);
                    let obfFile = zip.file(obfLocation);
                    let obf = await obfFile?.async("text");
                    getChapters(obf as string, folder, zip, folder);
                    // getStyling(obf as string, zip, folder);
                }
            }
        } catch (error) {
            console.error("Error reading EPUB contents:", error);
        }
    }

    function getObf(containterContent: string): string | null {
        let parser = new DOMParser();
        let containterDOM = parser.parseFromString(
            containterContent,
            "text/xml"
        );
        let result: string | null = null;
        containterDOM.querySelectorAll("rootfile").forEach((rootfile) => {
            if (
                rootfile.getAttribute("media-type") ===
                "application/oebps-package+xml"
            )
                result = rootfile.getAttribute("full-path");
        });
        return result;
    }

    let images: any = {};

    async function getChapters(
        file: string,
        folder: string,
        zip: JSZip,
        obfLocation: string
    ) {
        let parser = new DOMParser();
        let opf = parser.parseFromString(file, "text/xml");
        const items = opf.querySelectorAll("manifest item"); // Correctly target <item> elements within <manifest>
        let contents = "";

        for (const item of items) {
            let itemLocation = item.getAttribute("href") as string;
            let itemType = item.getAttribute("media-type") as string;
            let itemFile = zip.file(folder + itemLocation); // Use the variable correctly
            if (itemType.includes("image")) {
                if (itemFile) {
                    if (images[itemLocation] === undefined) {
                        let itemContents = await itemFile.async("blob");
                        let blobURL = URL.createObjectURL(itemContents);
                        console.log(blobURL);
                        images[itemLocation] = blobURL;
                    }
                    contents += `<img src=${images[itemLocation]}>`;
                }
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
                            itemType,
                            zip,
                            obfLocation
                        );
                        contents += cleanItemContents; // Accumulate contents
                    }
                }
            }
        }
        setContainer(contents); // Update state once with all contents
        addStyling();
    }

    function getContainingFolder(location: string) {
        let fileName = location.split("/").slice(-1)[0];
        return location.replace(fileName, "");
    }

    async function cleanImages(
        document: string,
        type: any,
        zip: JSZip,
        obfLocation: string
    ): Promise<string> {
        let parser = new DOMParser();
        const validTypes = [
            "text/html",
            "text/xml",
            "application/xml",
            "application/xhtml+xml",
            "image/svg+xml",
        ];

        if (validTypes.includes(type)) {
            let newDocument = parser.parseFromString(document, type);
            let imgs = newDocument.querySelectorAll("img");
            for (let img of imgs) {
                let src = img.getAttribute("src") as string;
                while (src[0] === "." || src[0] === "/") src = src.slice(1);
                src = obfLocation + src;
                console.log(src);
                //@ts-ignore
                if (images[src]) {
                    //@ts-ignore
                    img.setAttribute("src", images[src]);
                } else {
                    let blob = await zip.file(src)?.async("blob");
                    if (blob) {
                        let url = URL.createObjectURL(blob);
                        //@ts-ignore
                        images[src] = url;
                        img.setAttribute("src", url);
                    }
                }
            }

            let images = newDocument.querySelectorAll("image");
            for (let image of images) {
                let src = image.getAttribute("xlink:href") as string;
                while (src[0] === "." || src[0] === "/") src = src.slice(1);
                src = obfLocation + src;
                console.log(src);

                //@ts-ignore
                if (images[src]) {
                    //@ts-ignore
                    image.setAttribute("xlink:href", images[src]);
                } else {
                    let blob = await zip.file(src)?.async("blob");
                    if (blob) {
                        let url = URL.createObjectURL(blob);
                        //@ts-ignore
                        images[src] = url;
                        image.setAttribute("xlink:href", url);
                    }
                }
            }
            let seri = new XMLSerializer();
            let newDoc = seri.serializeToString(newDocument);
            return newDoc;
        } else return document;
    }

    function addStyling() {
        let styleBlob = new Blob([style], { type: "text/css" });
        let blobURL = URL.createObjectURL(styleBlob);

        let link = document.createElement("link");
        link.href = blobURL;
        link.rel = "stylesheet";

        document.head.appendChild(link);
    }

    function Book({ content }: any) {
        if (content === null) {
            return <div>Something not working</div>;
        }

        return (
            <div className="chapters">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        );
    }

    return (
        <>
            <h1>Bok</h1>
            <div className="card">
                <input
                    type="file"
                    id="fileInput"
                    accept=".epub"
                    onChange={handleFileInput}
                />
                <Book content={container} />
            </div>
        </>
    );
}

export default App;
