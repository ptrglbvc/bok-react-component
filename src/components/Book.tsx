import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import usePage from "../hooks/usePage.tsx";
import usePercentageRead from "../hooks/usePercentageRead.tsx";
import useLocalStorage from "../hooks/useLocalStorage.tsx";
import useNavigation from "../hooks/useNavigation.ts";

import PageNumber from "./PageNumber.tsx";

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
}: PageProps) {
  const [pageWidth, pageHeight, noOfPages] = usePage();
  const bookRef = useRef<HTMLDivElement>(null);
  let { percentRead, setPercentRead } = usePercentageRead(bookRef); // eslint-disable-line

  const [currentPage, setCurrentPage] = useState(1);
  let [pageCount, setPageCount] = useState(0); // eslint-disable-line
  useLocalStorage(title, percentRead, sidePadding, fontSize, fontFamily);
  useNavigation(changePage, isOptionMenuVisible);

  useEffect(() => {
    const resumeReading = () => {
      const local = localStorage.getItem(title);
      if (local) {
        const parsedLocal = JSON.parse(local);
        if (parsedLocal) {
          setPercentRead(parsedLocal.percentRead);
          percentRead = parsedLocal.percentRead; // eslint-disable-line
          if (parsedLocal.fontSize) {
            setFontSize(parsedLocal.fontSize);
          }
          if (parsedLocal.padding) {
            setPadding(parsedLocal.padding);
          }
          if (parsedLocal.fontFamily) {
            setFontFamily(parsedLocal.fontFamily);
          }
        }
      }
    };
    resumeReading();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    bookRef.current?.style.setProperty(
      "--side-padding",
      sidePadding.toString() + "px",
    );
    bookRef.current?.style.setProperty(
      "--font-size",
      fontSize.toString() + "em",
    );
    console.log(fontFamily);
    bookRef.current?.style.setProperty("--font-family", fontFamily);
    //ducktape basically
    //otherwise it will calculate the number of pages faster than the book can render completely
    //and set the pageCount way too high on load, resize fixes it tho
    setTimeout(() => {
      const newPageCount = calculateThePages();
      if (newPageCount) updatePage(newPageCount);
      document.addEventListener("keydown", turnPage);
    }, 600);

    return () => {
      setTimeout(() => {
        document.removeEventListener("keydown", turnPage);
      }, 600);
    };
  }, [pageHeight, pageWidth, sidePadding, fontSize, fontFamily]); // eslint-disable-line

  const calculateThePages = () => {
    if (bookRef.current) {
      const totalWidth = bookRef.current.scrollWidth;
      const newPageCount = Math.ceil(totalWidth / (pageWidth * noOfPages));
      setPageCount(newPageCount);
      pageCount = newPageCount;
      return newPageCount;
    }
  };

  function turnPage(event: KeyboardEvent) {
    event.preventDefault();
    bookRef.current?.focus;
    if (event.key === "ArrowLeft") changePage(-1);
    if (event.key === "ArrowRight") changePage(1);
  }

  function changePage(amount: number) {
    setCurrentPage((prev) => {
      const newValue = prev + amount;
      if (newValue > 0 && newValue <= pageCount && bookRef.current) {
        bookRef.current.scroll({
          left: (newValue - 1) * (pageWidth * noOfPages),
          behavior: "smooth",
        });
        return newValue;
      }
      return prev;
    });
  }

  function updatePage(newPageCount: number) {
    let newPage = Math.ceil(newPageCount * percentRead);
    if (newPage === 0) newPage = 1;
    if (newPage > newPageCount) newPage = newPageCount;

    if (bookRef.current) {
      setCurrentPage(newPage);
      bookRef.current.focus();
      bookRef.current.scrollLeft = (newPage - 1) * pageWidth * noOfPages;
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }
  }

  return (
    <div>
      {/* <div style={{ position: "absolute", opacity: "0" }}>
        {padding}
        {fontSize}
      </div> */}
      <div
        ref={bookRef}
        dangerouslySetInnerHTML={{ __html: content }}
        className="book-page"
        style={{
          overflowY: "hidden",
          overflowX: "hidden",
          maxHeight: `${pageHeight}px`, // Ensures the div doesn't grow vertically
        }}
      ></div>
      <PageNumber pages={pageCount} currentPage={currentPage} />
    </div>
  );
}
