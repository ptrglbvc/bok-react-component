// src/components/Book.tsx
import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react"; // Added React, useCallback
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
  containerElementRef, // Prop received from BokReader
}: PageProps) {
  const bookRef = useRef<HTMLDivElement>(null);

  // --- Add this console log ---
  console.log(
    "Book component render: containerElementRef prop is:",
    containerElementRef,
  );
  // --- End console log ---

  // The hook call that might be receiving undefined
  const [pageWidth, pageHeight, noOfPages] = usePage(containerElementRef);

  const { percentRead, setPercentRead } = usePercentageRead(bookRef);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useLocalStorage(title, percentRead, sidePadding, fontSize, fontFamily);
  // Pass the correct ref if useNavigation needs it
  // useNavigation(changePage, isOptionMenuVisible, containerElementRef); // Or bookRef?
  const changePage = useCallback(
    (amount: number) => {
      setCurrentPage((prev) => {
        const scrollContainer = bookRef.current;
        if (scrollContainer && pageCount > 0 && noOfPages > 0) {
          const effectivePageWidth = scrollContainer.clientWidth / noOfPages;
          const newValue = prev + amount;
          if (newValue > 0 && newValue <= pageCount) {
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
  ); // Dependencies updated

  useNavigation(changePage, isOptionMenuVisible); // Assuming it doesn't need the ref for now

  // --- Effect to load reading progress (simplified dependencies) ---
  useEffect(() => {
    if (!title) return;
    const local = localStorage.getItem(title);
    if (local) {
      try {
        const parsedLocal = JSON.parse(local);
        if (parsedLocal) {
          setPercentRead(parsedLocal.percentRead || 0);
          // Only call setters if value exists to avoid unnecessary re-renders
          if (parsedLocal.fontSize !== undefined)
            setFontSize(parsedLocal.fontSize);
          if (parsedLocal.padding !== undefined)
            setPadding(parsedLocal.padding);
          if (parsedLocal.fontFamily !== undefined)
            setFontFamily(parsedLocal.fontFamily);
        }
      } catch (e) {
        console.error("Failed to parse local storage for", title, e);
      }
    }
    // Only run when title changes, setters are stable refs.
  }, [title, setPercentRead, setFontSize, setPadding, setFontFamily]);

  // --- Effect to calculate pages and apply styles ---
  // Memoize calculation/update functions used in dependency array
  const calculateThePages = useCallback(() => {
    if (bookRef.current && pageWidth > 0 && noOfPages > 0) {
      const scrollContainer = bookRef.current;
      const totalWidth = scrollContainer.scrollWidth;
      const effectivePageWidth = scrollContainer.clientWidth / noOfPages;
      if (effectivePageWidth > 0) {
        const newPageCount = Math.ceil(totalWidth / effectivePageWidth);
        setPageCount(newPageCount);
        return newPageCount;
      }
    }
    setPageCount(0);
    return 0;
  }, [bookRef, pageWidth, noOfPages]); // Dependencies updated

  const updatePage = useCallback(
    (newPageCount: number) => {
      const scrollContainer = bookRef.current;
      if (!scrollContainer || !noOfPages) return;

      // Access latest percentRead state safely
      let currentPercentRead = 0;
      setPercentRead((prev) => {
        // Use the functional update form to read latest state
        currentPercentRead = prev;
        return prev; // Don't change it, just read
      });

      let newPage = Math.ceil(newPageCount * currentPercentRead);
      if (newPage <= 0) newPage = 1;
      if (newPage > newPageCount) newPage = newPageCount;

      const effectivePageWidth = scrollContainer.clientWidth / noOfPages;
      setCurrentPage(newPage);
      scrollContainer.scrollLeft = (newPage - 1) * effectivePageWidth;

      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    },
    [bookRef, noOfPages, setIsLoading, setPercentRead],
  ); // Dependencies updated

  const turnPage = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "ArrowLeft") changePage(-1);
      if (event.key === "ArrowRight") changePage(1);
    },
    [changePage],
  );

  useEffect(() => {
    if (pageWidth <= 0 || pageHeight <= 0) {
      return; // Wait for valid dimensions
    }

    setIsLoading(true);

    if (bookRef.current) {
      bookRef.current.style.setProperty(
        "--side-padding",
        sidePadding.toString() + "px",
      );
      bookRef.current.style.setProperty(
        "--font-size",
        fontSize.toString() + "em",
      );
      bookRef.current.style.setProperty("--font-family", fontFamily);
      bookRef.current.style.maxHeight = `${pageHeight}px`;
    }

    const timer = setTimeout(() => {
      const newPageCount = calculateThePages();
      if (newPageCount > 0) {
        updatePage(newPageCount);
      } else {
        setIsLoading(false); // Ensure loading turns off if calculation fails
      }
      document.addEventListener("keydown", turnPage);
    }, 600);

    return () => {
      clearTimeout(timer);
      // Use a consistent way to remove listener, maybe store function ref?
      document.removeEventListener("keydown", turnPage);
    };
    // Add memoized functions to dependency array
  }, [
    pageHeight,
    pageWidth,
    noOfPages,
    sidePadding,
    fontSize,
    fontFamily,
    setIsLoading,
    calculateThePages,
    updatePage,
    turnPage,
  ]); // Removed content/title if not directly used for layout calc

  return (
    <>
      <div
        ref={bookRef}
        dangerouslySetInnerHTML={{ __html: content }}
        className="book-page"
        // Style applied via useEffect now based on pageHeight
      ></div>
      <PageNumber pages={pageCount} currentPage={currentPage} />
    </>
  );
}
