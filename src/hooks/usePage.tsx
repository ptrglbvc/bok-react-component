//@ts-ignore
import { useState, useEffect } from "react";

export default function usePage() {
    const getBodyRect = () => document.body.getBoundingClientRect();
    let [height, setHeight] = useState(getBodyRect().height);
    let [width, setWidth] = useState(
        getBodyRect().height < getBodyRect().width
            ? getBodyRect().width / 2
            : getBodyRect().width
    );
    let [noOfPages, setNoOfPages] = useState(
        getBodyRect().height < getBodyRect().width ? 2 : 1
    );

    const updatePageDimensions = () => {
        if (getBodyRect().height < getBodyRect().width) {
            setHeight(getBodyRect().height);
            setWidth(getBodyRect().width / 2);
            setNoOfPages(2);
        } else {
            setHeight(getBodyRect().height);
            setWidth(getBodyRect().width);
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
