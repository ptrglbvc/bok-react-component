import { useCallback } from "react";
import BokReader from "./components/BokReader/BokReader";
import "./style.css";

function App() {
    const epubUrl =
        "https://43ru4bvzl6.ufs.sh/f/7NUfZePLME3PVayx92gCYZpXUfVbdrqmaLk98HEcRth34Ko1";

    const handleReaderTitleChange = useCallback((title: string) => {
        if (title && title !== "Loading...") {
            document.title = title; // Update the browser tab title
        } else {
            // Reset to default if title is empty or just "Loading..."
            document.title = "Bok";
        }
    }, []);

    const handleReaderError = useCallback((errorMsg: string) => {
        console.error("BokReader reported an error:", errorMsg);
        alert(`Error loading book: ${errorMsg}\nPlease try a different file.`);
        console.error("Failed to load from URL, cannot automatically reset.");
    }, []);

    const handleReaderLoading = useCallback((isLoading: boolean) => {
        console.log(`BokReader isLoading: ${isLoading}`);
    }, []);

    const supportedFonts = [
        { name: "Inter", displayName: "Inter" },
        { name: "Roboto", displayName: "Roboto" },
        { name: "Merriweather", displayName: "Merriweather" },
    ];

    return (
        <>
            {/* Directly render BokReader with the URL */}
            <div
                style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
            >
                <BokReader
                    epubDataSource={epubUrl}
                    onTitleChange={handleReaderTitleChange}
                    onError={handleReaderError}
                    onLoadingChange={handleReaderLoading}
                    supportedFonts={supportedFonts}
                />
            </div>
        </>
    );
}

export default App;
