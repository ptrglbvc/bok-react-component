import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import usePage from "../hooks/usePage.tsx";
import usePercentageRead from "../hooks/usePercentageRead.tsx";
import useLocalStorage from "../hooks/useLocalStorage.tsx";

import PageNumber from "./PageNumber.tsx";
import Navigation from "./Navigation.tsx";

interface PageProps {
    content: string;
    title: string;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function Book({ content, title, setIsLoading }: PageProps) {
    //@ts-ignore
    let [isPaged, setIsPaged] = useState(true);
    //@ts-ignore
    let [padding, setPadding] = useState(40);
    let [pageWidth, pageHeight, noOfPages] = usePage();
    let bookRef = useRef<HTMLDivElement>(null);
    let { percentRead, setPercentRead } = usePercentageRead(bookRef);

    let [currentPage, setCurrentPage] = useState(1);
    let [pageCount, setPageCount] = useState(0);
    useLocalStorage(title, percentRead);

    useEffect(() => {
        resumeReading();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        //ducktape basically
        //otherwise it will calculate the number of pages faster than the book can render completely
        //and set the pageCount way too high on load, resize fixes it tho
        setTimeout(() => {
            let newPageCount = calculateThePages();
            if (newPageCount) updatePage(newPageCount);
            document.addEventListener("keydown", turnPage);
        }, 600);

        return () => {
            setTimeout(() => {
                document.removeEventListener("keydown", turnPage);
            }, 600);
        };
    }, [pageHeight, pageWidth, padding]);

    function resumeReading() {
        let local = localStorage.getItem(title);
        if (local) {
            let parsedLocal = JSON.parse(local);
            if (parsedLocal) {
                setPercentRead(parsedLocal.percentRead);
                percentRead = parsedLocal.percentRead;
            }
        }
    }

    const calculateThePages = () => {
        if (bookRef.current) {
            let totalWidth = bookRef.current.scrollWidth;
            let newPageCount = Math.ceil(totalWidth / (pageWidth * noOfPages));
            setPageCount(newPageCount);
            pageCount = newPageCount;
            return newPageCount;
        }
    };

    function turnPage(event: KeyboardEvent) {
        event.preventDefault();
        console.log(currentPage);
        bookRef.current?.focus;
        if (event.key === "ArrowLeft") changePage(-1);
        if (event.key === "ArrowRight") changePage(1);
    }

    function changePage(amount: number) {
        setCurrentPage((prev) => {
            let newValue = prev + amount;
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
            <div
                ref={bookRef}
                dangerouslySetInnerHTML={{ __html: content }}
                className="book-page"
                style={{
                    overflowY: "hidden",
                    overflowX: "hidden",
                    // display: "inline-block",
                    maxHeight: `${pageHeight}px`, // Ensures the div doesn't grow vertically
                }}
            ></div>
            <Navigation
                changePage={changePage}
                toggleFullscreen={toggleFullScreen}
            />
            <PageNumber pages={pageCount} currentPage={currentPage} />
        </div>
    );

    if (!isPaged)
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                    style={{
                        padding: padding,
                        width: pageWidth - 2 * padding,
                        height: pageHeight - 2 * padding,
                    }}
                    className="book-page"
                >
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                <div
                    style={{
                        padding: padding,
                        width: pageWidth - 2 * padding,
                        height: pageHeight - 2 * padding,
                    }}
                    className="book-page"
                >
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        );
}

//@ts-ignore
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}
