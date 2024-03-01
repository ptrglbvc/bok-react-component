// @ts-ignore
import InputScreen from "./components/InputScreen.tsx";
import useEpub from "./hooks/useEpub.tsx";
import Book from "./components/Book.tsx";

function App() {
    let [rawContent, isLoading, handleFileInput] = useEpub();

    return (
        <>
            {!rawContent ? (
                <InputScreen
                    isLoading={isLoading}
                    handleFileInput={handleFileInput}
                />
            ) : (
                <Book content={rawContent as string} title="" />
            )}
        </>
    );
}

export default App;
