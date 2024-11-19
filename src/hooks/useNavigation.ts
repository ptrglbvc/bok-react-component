import { useCallback, useEffect, useRef } from "react";
import usePage from "./usePage";

const useNavigation = (
  changePage: (n: number) => void,
  isOptionMenuVisible: boolean,
) => {
  const [pageWidth, pageHeight] = usePage();
  const longPressTimerRef = useRef<null | number>(null);
  const selectedText = useRef("");

  const handlePageClick = useCallback(
    (tapWidth: number, tapHeight: number) => {
      if (!isOptionMenuVisible) {
        if (tapWidth / pageWidth <= 0.4 && tapHeight / pageHeight < 0.8) {
          changePage(-1);
        }
        if (tapWidth / pageWidth > 0.4 && tapHeight / pageHeight < 0.8) {
          changePage(1);
        }
      }
    },
    [changePage, isOptionMenuVisible, pageWidth, pageHeight],
  );

  useEffect(() => {
    const handleSelection = () => {
      const newSelectedText = window.getSelection()?.toString();
      if (newSelectedText && newSelectedText.length > 0) {
        selectedText.current = newSelectedText;
      } else selectedText.current = "";
    };
    document.addEventListener("selectionchange", handleSelection);
    return () => {
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, []); // dependency array can be empty because it doesn't use anything from component scope

  useEffect(() => {
    const handleTouchStart = () => {
      longPressTimerRef.current = setTimeout(() => {
        longPressTimerRef.current = null;
      }, 500);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (longPressTimerRef.current && selectedText.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
        const { pageX, pageY } = event.touches[0];
        handlePageClick(pageX, pageY);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pageWidth, handlePageClick]);

  useEffect(() => {
    const handleTouchStart = () => {
      longPressTimerRef.current = setTimeout(() => {}, 200);
    };

    const handleTouchEnd = (event: MouseEvent) => {
      if (longPressTimerRef.current && !selectedText.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
        handlePageClick(event.clientX, event.clientY);
      }
    };

    window.addEventListener("mousedown", handleTouchStart);
    window.addEventListener("mouseup", handleTouchEnd);

    return () => {
      window.removeEventListener("mousedown", handleTouchStart);
      window.removeEventListener("mouseup", handleTouchEnd);
    };
  }, [pageWidth, isOptionMenuVisible, handlePageClick]);
};

export default useNavigation;
