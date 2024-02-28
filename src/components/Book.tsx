import { useState, useRef, useEffect } from "react";
import usePage from "../hooks/usePage.tsx";
import PageNumber from "./PageNumber.tsx";

interface PageProps {
    content: string;
    title: string;
}

export default function Book({ content, title }: PageProps) {
    //@ts-ignore
    let [isPaged, setIsPaged] = useState(true);
    //@ts-ignore
    let [padding, setPadding] = useState(50);
    //@ts-ignore
    let [pageWidth, pageHeight, noOfPages] = usePage();
    let bookRef = useRef<HTMLDivElement>(null);

    let [currentPage, setCurrentPage] = useState(1);
    let [pageCount, setPageCount] = useState(0);
    let [percentRead, setPercentRead] = useState(0);

    function turnPage(event: KeyboardEvent) {
        event.preventDefault();
        bookRef.current?.focus;
        if (event.key === "ArrowLeft") changePage(-1);
        if (event.key === "ArrowRight") changePage(1);
    }

    function changePage(amount: number) {
        let newValue = currentPage + amount;
        if (newValue > 0 && newValue <= pageCount && bookRef.current) {
            setCurrentPage(newValue);
            currentPage += amount;
            bookRef.current.scroll({
                left: newValue * window.innerWidth,
                behavior: "smooth",
            });
        }
    }

    function updatePage(newPageCount: number, perc: number) {
        let newPage = Math.ceil(newPageCount * perc);
        console.log(perc);
        if (bookRef.current) {
            setCurrentPage(newPage);
            bookRef.current.focus();
            bookRef.current.scrollLeft = 0;
        }
    }

    useEffect(() => {
        if (bookRef.current) {
            let totalWidth = bookRef.current.scrollWidth;
            let pageWidth = window.innerWidth;

            let newPageCount = Math.ceil(totalWidth / pageWidth);

            let perc = currentPage / pageCount;

            setPageCount(newPageCount);
            pageCount = newPageCount;

            updatePage(newPageCount, perc);
            percentRead = currentPage / newPageCount;
            setPercentRead(percentRead);

            document.addEventListener("keydown", turnPage);
            return () => document.removeEventListener("keydown", turnPage);
        }
    }, [pageHeight, pageWidth, padding]);

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
