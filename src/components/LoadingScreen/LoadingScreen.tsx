import { PropagateLoader } from "react-spinners";
import styles from "./LoadingScreen.module.css";

type LoadingScreenProps = {
    isLoading: boolean;
    color: string | undefined;
};

export default function LoadingScreen({
    isLoading,
    color,
}: LoadingScreenProps) {
    return (
        <div
            className={
                isLoading
                    ? styles["loading-screen"]
                    : styles["loading-screen-gon"]
            }
        >
            <div>
                <PropagateLoader
                    color={color ? color : "red"}
                ></PropagateLoader>
            </div>
        </div>
    );
}
