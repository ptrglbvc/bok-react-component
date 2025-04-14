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
    containerElementRef: React.RefObject<HTMLDivElement | null>;
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
    const [percentRead, setPercentRead] = usePercentageRead(bookRef);
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
                    const newValue = prev + amount;
                    if (newValue >= 0 && newValue < pageCount) {
                        scrollContainer.scroll({
                            left: newValue * pageWidth,
                            behavior: "smooth",
                        });
                        return newValue;
                    }
                }
                return prev;
            });
        },
        [pageWidth, pageCount, noOfPages],
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

    useEffect(() => {
        const currentBookRef = bookRef.current;
        if (!currentBookRef || pageWidth <= 0 || pageHeight <= 0) return;

        setIsLoading(true);

        const timer = setTimeout(() => {
            currentBookRef.style.setProperty(
                "--side-padding",
                `${sidePadding}px`,
            );
            currentBookRef.style.setProperty("--font-size", `${fontSize}em`);
            currentBookRef.style.setProperty("--font-family", fontFamily);
            currentBookRef.style.maxHeight = `${pageHeight}px`;

            const totalWidth = currentBookRef.scrollWidth;
            const newPageCount =
                pageWidth > 0 && totalWidth > 0
                    ? Math.floor(totalWidth / pageWidth)
                    : 0;
            setPageCount(newPageCount);

            if (newPageCount > 0 && currentBookRef.clientWidth > 0) {
                let targetPage = Math.round(newPageCount * percentRead);
                targetPage = Math.max(
                    0,
                    Math.min(newPageCount - 1, targetPage),
                );
                if (currentPage !== targetPage) {
                    setCurrentPage(targetPage);
                    currentBookRef.scrollLeft = targetPage * pageWidth;
                }
            } else {
                setIsLoading(false);
                setCurrentPage(1);
            }
            setIsLoading(false);
        }, 400);

        return () => {
            clearTimeout(timer);
        };
    }, [
        // @eslint-ignore
        pageWidth,
        pageHeight,
        sidePadding,
        fontSize,
        fontFamily,
        noOfPages,
        content,
        title,
        setIsLoading,
        // currentPage,
        // percentRead,
    ]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(percentRead);
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                changePage(-1);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                changePage(1);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [changePage, pageWidth, percentRead]);

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
