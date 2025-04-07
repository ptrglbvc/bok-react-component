import { RefObject, useEffect, useState } from "react";

export default function usePercentageRead(
    bookRef: RefObject<HTMLDivElement | null>
): [number, React.Dispatch<React.SetStateAction<number>>] {
    const [percentRead, setPercentRead] = useState(0);

    useEffect(() => {
        const calculateThePercentage = () => {
            if (bookRef.current) {
                const totalWidth = bookRef.current.scrollWidth;
                const windowScrollLeft = bookRef.current.scrollLeft;
                const percentage =
                    totalWidth > 0 ? windowScrollLeft / totalWidth : 0;
                setPercentRead(percentage);
            }
        };

        const scrollElement = bookRef.current;
        scrollElement?.addEventListener("scroll", calculateThePercentage);

        calculateThePercentage();

        return () => {
            scrollElement?.removeEventListener(
                "scroll",
                calculateThePercentage
            );
        };
    }, [bookRef]);

    return [percentRead, setPercentRead];
}
