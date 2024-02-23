import { useState, ChangeEvent } from "react";
import "./App.css";
import JSZip from "jszip";

function App() {
    let [container, setContainer] = useState<string | Document>("");

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
                    setContainer(obf as string);
                    parseOpf(obf as string, folder, zip);
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

    async function parseOpf(file: string, folder: string, zip: JSZip) {
        let parser = new DOMParser();
        let opf = parser.parseFromString(file, "text/xml");
        const items = opf.querySelectorAll("manifest item"); // Correctly target <item> elements within <manifest>
        let contents = "";

        for (const item of items) {
            let itemLocation = item.getAttribute("href");
            if (itemLocation) {
                let itemFile = zip.file(folder + itemLocation); // Use the variable correctly
                if (itemFile) {
                    let itemContents = await itemFile.async("text");
                    contents += itemContents; // Accumulate contents
                }
            }
        }
        setContainer(contents); // Update state once with all contents
    }

    function getContainingFolder(location: string) {
        let fileName = location.split("/").slice(-1)[0];
        return location.replace(fileName, "");
    }

    function HtmlContentView({ content }: any) {
        if (content === null) {
            return <div>Something not working</div>;
        }
        return (
            <div>
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
                <p>
                    <HtmlContentView content={container} />
                </p>
            </div>
        </>
    );
}

export default App;
