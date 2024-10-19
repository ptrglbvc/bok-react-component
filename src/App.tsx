import { useRef, useState, useEffect } from "react";
import useEpub from "./hooks/useEpub.tsx";

import Book from "./components/Book.tsx";
import InputScreen from "./components/InputScreen/InputScreen.tsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.tsx";
import OptionsMenu from "./components/OptionsMenu/OptionsMenu.tsx";

function App() {
  const { title, rawContent, isLoading, setIsLoading, handleFileInput } =
    useEpub();
  const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
  const fontSize = useRef(1);
  const padding = useRef(30);

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
            padding={padding}
            isOptionMenuVisible={isOptionsMenuVisible}
          />
          {isOptionsMenuVisible && (
            <OptionsMenu
              onClose={() => setIsOptionsMenuVisible(false)}
              fontSize={fontSize}
              padding={padding}
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
