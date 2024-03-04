import { PropagateLoader } from "react-spinners";
import styles from "./InputScreen.module.css";

interface InputScreenProps {
    isLoading: boolean;
    handleFileInput: () => void;
}

export default function InputScreen({
    isLoading,
    handleFileInput,
}: InputScreenProps) {
    return (
        <div className={styles.input}>
            <h1>Bok</h1>
            <input
                type="file"
                id="fileInput"
                accept=".epub"
                onChange={handleFileInput}
            />
            {isLoading ? (
                <PropagateLoader color="red"></PropagateLoader>
            ) : (
                <></>
            )}
        </div>
    );
}
