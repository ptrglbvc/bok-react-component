//@ts-ignore
import { useState, useEffect } from "react";

export default function usePage() {
    let [height, setHeight] = useState(window.innerHeight);
    let [width, setWidth] = useState(
        window.innerHeight < window.innerWidth
            ? Math.floor(window.innerWidth / 2)
            : window.innerWidth
    );
    let [noOfPages, setNoOfPages] = useState(
        window.innerHeight < window.innerWidth ? 2 : 1
    );

    const updatePageDimensions = () => {
        if (window.innerHeight < window.innerWidth) {
            setHeight(window.innerHeight);
            setWidth(Math.floor(window.innerWidth / 2));
            setNoOfPages(2);
        } else {
            setHeight(window.innerHeight);
            setWidth(window.innerWidth);
            setNoOfPages(1);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", updatePageDimensions);
        return () => {
            window.removeEventListener("resize", updatePageDimensions);
        };
    }, []);
    return [width, height, noOfPages];
}
