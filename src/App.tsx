import { useState } from "react";
import useEpub from "./hooks/useEpub.tsx";

import Book from "./components/Book.tsx";
import InputScreen from "./components/InputScreen/InputScreen.tsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.tsx";
import OptionsMenu from "./components/OptionsMenu/OptionsMenu.tsx";

function App() {
  const { title, rawContent, isLoading, setIsLoading, handleFileInput } =
    useEpub();
  if (title) document.title = title;
  const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
  const [fontSize, setFontSize] = useState(1.2);
  const [sidePadding, setSidePadding] = useState(30);
  const [fontFamily, setFontFamily] = useState("Inter");

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
            fontFamily={fontFamily}
            setPadding={setSidePadding}
            setFontSize={setFontSize}
            setFontFamily={setFontFamily}
            isOptionMenuVisible={isOptionsMenuVisible}
          />
          {isOptionsMenuVisible && (
            <OptionsMenu
              onClose={() => setIsOptionsMenuVisible(false)}
              fontSize={fontSize}
              padding={sidePadding}
              fontFamily={fontFamily}
              setPadding={setSidePadding}
              setFontSize={setFontSize}
              setFontFamily={setFontFamily}
              setIsLoading={setIsLoading}
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
