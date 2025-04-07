import { RefObject, useEffect, useState } from "react";

export default function usePercentageRead(
  bookRef: RefObject<HTMLDivElement>,
): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [percentRead, setPercentRead] = useState(0);

  useEffect(() => {
    const calculateThePercentage = () => {
      if (bookRef.current) {
        const totalWidth = bookRef.current.scrollWidth;
        const windowScrollLeft = bookRef.current.scrollLeft;
        setPercentRead(windowScrollLeft / totalWidth);
      }
    };
    bookRef.current?.addEventListener("scroll", calculateThePercentage);

    const scrollRef = bookRef.current;

    return () => {
      scrollRef?.removeEventListener("scroll", calculateThePercentage);
    };
  }, [bookRef]);

  return [percentRead, setPercentRead];
}
