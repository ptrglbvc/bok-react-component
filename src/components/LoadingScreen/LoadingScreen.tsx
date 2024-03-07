import { PropagateLoader } from "react-spinners";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ isLoading }: { isLoading: boolean }) {
    return (
        <div
            className={
                isLoading
                    ? styles["loading-screen"]
                    : styles["loading-screen-gon"]
            }
        >
            <div className={styles["loading-bar"]}>
                <PropagateLoader color="red"></PropagateLoader>
            </div>
        </div>
    );
}
