// @ts-ignore
import InputScreen from "./components/InputScreen.tsx";
import useEpub from "./hooks/useEpub.tsx";
import RawBook from "./components/RawBook.tsx";

function App() {
    let [rawContent, isLoading, handleFileInput] = useEpub();

    return (
        <div className="book-page">
            {!rawContent ? (
                <InputScreen
                    isLoading={isLoading}
                    handleFileInput={handleFileInput}
                />
            ) : (
                <RawBook content={rawContent} />
            )}
        </div>
    );
}

export default App;
