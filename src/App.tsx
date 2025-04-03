import { useState, useCallback } from "react";
import BokReader from "./components/BokReader/BokReader";
import InputScreen from "./components/InputScreen/InputScreen";

function App() {
  const [epubFile, setEpubFile] = useState<File | null>(null);
  const handleFileSelected = useCallback((file: File) => {
    if (file && file.type === "application/epub+zip") {
      setEpubFile(file); // Set the file state to trigger BokReader rendering
    } else {
      alert("Please select a valid .epub file.");
      setEpubFile(null); // Ensure it's null if invalid
    }
  }, []); // Callback from BokReader when the title is parsed

  const handleReaderTitleChange = useCallback((title: string) => {
    if (title && title !== "Loading...") {
      document.title = title; // Update the browser tab title
    } else {
      // Reset to default if title is empty or just "Loading..."
      document.title = "Bok";
    }
  }, []);

  // Callback from BokReader if an error occurs during loading/parsing
  const handleReaderError = useCallback((errorMsg: string) => {
    console.error("BokReader reported an error:", errorMsg);
    // Provide feedback to the user
    alert(`Error loading book: ${errorMsg}\nPlease try a different file.`);
    // Reset the state to show the InputScreen again
    setEpubFile(null);
  }, []);

  // Optional: Callback to know when BokReader is internally loading
  const handleReaderLoading = useCallback((isLoading: boolean) => {
    console.log(`BokReader isLoading: ${isLoading}`);
    // You could potentially show a very lightweight website-level overlay
    // here if desired, but BokReader has its own internal loading screen.
  }, []);

  return (
    <>
      {!epubFile ? (
        // If no epub file is loaded yet, show the InputScreen
        <InputScreen handleFileInput={handleFileSelected} />
      ) : (
        // If an epub file IS loaded, render the BokReader component
        // It's crucial to give BokReader a defined size.
        // This div makes it fill the viewport.
        <div style={{ width: "300px", height: "500px", overflow: "hidden" }}>
          <BokReader
            epubDataSource={epubFile} // Pass the file object to the reader
            onTitleChange={handleReaderTitleChange} // Get title updates
            onError={handleReaderError} // Get error notifications
            onLoadingChange={handleReaderLoading} // Optional: get loading status
            // className="my-custom-reader-styles" // Optional: Add custom classes
            // style={{ border: '1px solid blue' }} // Optional: Add custom inline styles
          />
        </div>
      )}
    </>
  );
}

export default App;
