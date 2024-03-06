import { FunctionComponent } from "react";
import styles from "./PrevAndNextPage.module.css";

interface PrevAndNextPageProps {
    currentPage: number;
    pageWidth: number;
}

const PrevAndNextPage: FunctionComponent<PrevAndNextPageProps> = ({
    currentPage,
    pageWidth,
}: PrevAndNextPageProps) => {
    return (
        <>
            <div
                className={styles["prev-page"]}
                style={{ left: `${(currentPage - 1) * pageWidth}px ` }}
            ></div>
            <div
                className={styles["next-page"]}
                style={{ left: `${(currentPage + 1) * pageWidth}px ` }}
            ></div>
        </>
    );
};

export default PrevAndNextPage;
