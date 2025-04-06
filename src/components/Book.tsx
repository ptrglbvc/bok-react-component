// src/components/Book.tsx
import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import usePage from "../hooks/usePage";
import usePercentageRead from "../hooks/usePercentageRead";
import useLocalStorage from "../hooks/useLocalStorage";
import useNavigation from "../hooks/useNavigation";
import PageNumber from "./PageNumber";

interface PageProps {
  content: string;
  title: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  fontSize: number;
  fontFamily: string;
  sidePadding: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  setPadding: React.Dispatch<React.SetStateAction<number>>;
  setFontFamily: React.Dispatch<React.SetStateAction<string>>;
  isOptionMenuVisible: boolean;
  containerElementRef: React.RefObject<HTMLDivElement>;
}

export default function Book({
  content,
  title,
  setIsLoading,
  fontSize,
  sidePadding,
  fontFamily,
  isOptionMenuVisible,
  setFontSize,
  setPadding,
  setFontFamily,
  containerElementRef,
}: PageProps) {
  const bookRef = useRef<HTMLDivElement>(null);

  const [pageWidth, pageHeight, noOfPages] = usePage(containerElementRef);

  const { percentRead, setPercentRead } = usePercentageRead(bookRef);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useLocalStorage(title, percentRead, sidePadding, fontSize, fontFamily);

  const changePage = useCallback(
    (amount: number) => {
      setCurrentPage((prev) => {
        const scrollContainer = bookRef.current;
        if (
          scrollContainer &&
          pageCount > 0 &&
          noOfPages > 0 &&
          scrollContainer.clientWidth > 0
        ) {
          const effectivePageWidth = scrollContainer.clientWidth / noOfPages;
          const newValue = prev + amount;
          if (newValue >= 1 && newValue <= pageCount) {
            scrollContainer.scroll({
              left: (newValue - 1) * effectivePageWidth,
              behavior: "smooth",
            });
            return newValue;
          }
        }
        return prev;
      });
    },
    [bookRef, pageCount, noOfPages],
  );

  useNavigation(changePage, isOptionMenuVisible, containerElementRef);

  useEffect(() => {
    if (!title) return;
    const local = localStorage.getItem(title);
    if (local) {
      try {
        const parsedLocal = JSON.parse(local);
        if (parsedLocal) {
          setPercentRead(parsedLocal.percentRead || 0);
          if (parsedLocal.fontSize !== undefined)
            setFontSize(parsedLocal.fontSize);
          if (parsedLocal.padding !== undefined)
            setPadding(parsedLocal.padding);
          if (parsedLocal.fontFamily !== undefined)
            setFontFamily(parsedLocal.fontFamily);
        }
      } catch (e) {
        console.error("Failed to parse local storage for", title, e);
        setPercentRead(0);
      }
    } else {
      setPercentRead(0);
    }
    setCurrentPage(1);
  }, [title, setPercentRead, setFontSize, setPadding, setFontFamily]);

  const calculateThePages = useCallback(() => {
    const scrollContainer = bookRef.current;
    if (
      scrollContainer &&
      pageWidth > 0 &&
      noOfPages > 0 &&
      scrollContainer.clientWidth > 0
    ) {
      const totalWidth = scrollContainer.scrollWidth;
      const effectivePageWidth = scrollContainer.clientWidth / noOfPages;

      if (effectivePageWidth > 0 && totalWidth > 0) {
        const newPageCount = Math.ceil(totalWidth / effectivePageWidth);
        setPageCount(newPageCount);
        return newPageCount;
      }
    }
    setPageCount(0);
    return 0;
  }, [bookRef, pageWidth, noOfPages]);

  const updatePage = useCallback(
    (newPageCount: number) => {
      const scrollContainer = bookRef.current;

      if (
        !scrollContainer ||
        !noOfPages ||
        newPageCount <= 0 ||
        scrollContainer.clientWidth <= 0
      ) {
        console.warn("updatePage: Cannot update page, invalid conditions.", {
          hasScrollContainer: !!scrollContainer,
          noOfPages,
          newPageCount,
          clientWidth: scrollContainer?.clientWidth,
        });
        setIsLoading(false);
        return;
      }

      let targetPage = Math.ceil(newPageCount * percentRead);
      targetPage = Math.max(1, Math.min(newPageCount, targetPage));

      const effectivePageWidth = scrollContainer.clientWidth / noOfPages;

      setCurrentPage(targetPage);
      scrollContainer.scrollLeft = (targetPage - 1) * effectivePageWidth;

      setIsLoading(false);
      // Cannot return cleanup for timeout easily from useCallback
    },
    [bookRef, noOfPages, setIsLoading, percentRead, setCurrentPage],
  );

  const turnPage = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        changePage(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        changePage(1);
      }
    },
    [changePage],
  );

  useEffect(() => {
    const currentBookRef = bookRef.current;

    if (pageWidth <= 0 || pageHeight <= 0 || !currentBookRef) {
      return;
    }

    currentBookRef.style.setProperty("--side-padding", `${sidePadding}px`);
    currentBookRef.style.setProperty("--font-size", `${fontSize}em`);
    currentBookRef.style.setProperty("--font-family", fontFamily);
    currentBookRef.style.maxHeight = `${pageHeight}px`;

    const timer = setTimeout(() => {
      const newPageCount = calculateThePages();

      if (newPageCount > 0) {
        updatePage(newPageCount);
      } else {
        setIsLoading(false);
        setCurrentPage(1);
      }
    }, 500);

    document.addEventListener("keydown", turnPage);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", turnPage);
    };
  }, [
    content,
    pageHeight,
    pageWidth,
    noOfPages,
    sidePadding,
    fontSize,
    fontFamily,
    title,
    calculateThePages,
    // updatePage,
    turnPage,
    setIsLoading,
  ]);

  return (
    <>
      <div
        ref={bookRef}
        dangerouslySetInnerHTML={{ __html: content }}
        className="book-page"
      ></div>
      <PageNumber pages={pageCount} currentPage={currentPage} />
    </>
  );
}
