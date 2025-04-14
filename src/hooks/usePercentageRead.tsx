import { RefObject, useEffect, useState, useCallback } from "react";

export default function usePercentageRead(
    bookRef: RefObject<HTMLDivElement | null>,
): [number, React.Dispatch<React.SetStateAction<number>>] {
    const [percentRead, setPercentRead] = useState(0);

    const calculatePercentage = useCallback(() => {
        if (bookRef.current) {
            const totalWidth = bookRef.current.scrollWidth;
            const windowScrollLeft = bookRef.current.scrollLeft;
            const percentage =
                totalWidth > 0 ? windowScrollLeft / totalWidth : 0;
            setPercentRead(percentage);
        }
    }, [bookRef]);

    useEffect(() => {
        const scrollElement = bookRef.current;
        if (!scrollElement) return;

        // Debounce variables
        let debounceTimer: NodeJS.Timeout | null = null;
        const DEBOUNCE_DELAY = 100;

        const handleScroll = () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }

            debounceTimer = setTimeout(() => {
                calculatePercentage();
            }, DEBOUNCE_DELAY);
        };

        scrollElement.addEventListener("scroll", handleScroll);

        calculatePercentage();

        return () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
            scrollElement.removeEventListener("scroll", handleScroll);
        };
    }, [calculatePercentage, bookRef]);

    return [percentRead, setPercentRead];
}
