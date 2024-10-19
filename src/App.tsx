import { useRef, useState, useEffect } from "react";
import useEpub from "./hooks/useEpub.tsx";

import Book from "./components/Book.tsx";
import InputScreen from "./components/InputScreen/InputScreen.tsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.tsx";
import OptionsMenu from "./components/OptionsMenu/OptionsMenu.tsx";

function App() {
  const {
    title,
    rawContent,
    setRawContent,
    isLoading,
    setIsLoading,
    handleFileInput,
  } = useEpub();
  const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
  const [fontSize, setFontSize] = useState(1.2);
  const [sidePadding, setSidePadding] = useState(30);

  useEffect(() => {
    setTimeout(() => {
      console.log(isOptionsMenuVisible);
    }, 1000);
  });

  return (
    <>
      <LoadingScreen isLoading={isLoading}></LoadingScreen>
      {!rawContent ? (
        <InputScreen handleFileInput={handleFileInput} />
      ) : (
        <>
          <Book
            content={rawContent as string}
            title={title}
            setIsLoading={setIsLoading}
            fontSize={fontSize}
            sidePadding={sidePadding}
            setPadding={setSidePadding}
            setFontSize={setFontSize}
            isOptionMenuVisible={isOptionsMenuVisible}
          />
          {isOptionsMenuVisible && (
            <OptionsMenu
              onClose={() => setIsOptionsMenuVisible(false)}
              fontSize={fontSize}
              padding={sidePadding}
              setPadding={setSidePadding}
              setFontSize={setFontSize}
              exitBook={() => setRawContent("")}
            />
          )}
          {!isOptionsMenuVisible && (
            <div
              className="bottom-click-area"
              onClick={() => setIsOptionsMenuVisible(true)}
            ></div>
          )}
        </>
      )}
    </>
  );
}

export default App;
