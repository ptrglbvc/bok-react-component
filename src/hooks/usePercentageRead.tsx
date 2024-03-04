import { RefObject, useEffect, useState } from "react";

export default function usePercentageRead(bookRef: RefObject<HTMLDivElement>) {
    let [percentRead, setPercentRead] = useState(0);

    useEffect(() => {
        const calculateThePercentage = () => {
            if (bookRef.current) {
                let totalWidth =
                    bookRef.current.scrollWidth - window.innerWidth;
                let windowScrollLeft = bookRef.current.scrollLeft;
                setPercentRead(windowScrollLeft / totalWidth);
            }
        };
        bookRef.current?.addEventListener("scroll", calculateThePercentage);

        return () => {
            bookRef.current?.removeEventListener(
                "scroll",
                calculateThePercentage
            );
        };
    });
    return { percentRead, setPercentRead };
}
