import styles from "./InputScreen.module.css";
import { ChangeEvent } from "react";

interface InputScreenProps {
    handleFileInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputScreen({ handleFileInput }: InputScreenProps) {
    return (
        <div className={styles.input}>
            <h1>Bok</h1>
            <input
                type="file"
                id="fileInput"
                accept=".epub"
                onChange={handleFileInput}
            />
        </div>
    );
}
