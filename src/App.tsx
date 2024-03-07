// @ts-ignore
import InputScreen from "./components/InputScreen/InputScreen.tsx";
import useEpub from "./hooks/useEpub.tsx";
import Book from "./components/Book.tsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.tsx";

function App() {
    let { title, rawContent, isLoading, handleFileInput } = useEpub();

    return (
        <>
            <LoadingScreen isLoading={isLoading}></LoadingScreen>
            {!rawContent ? (
                <InputScreen handleFileInput={handleFileInput} />
            ) : (
                <Book content={rawContent as string} title={title} />
            )}
        </>
    );
}

export default App;
