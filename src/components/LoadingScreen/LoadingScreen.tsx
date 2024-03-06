import { PropagateLoader } from "react-spinners";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
    return (
        <div className={styles["loading-screen"]}>
            <div className={styles["loading-bar"]}>
                <PropagateLoader color="red"></PropagateLoader>
            </div>
        </div>
    );
}
