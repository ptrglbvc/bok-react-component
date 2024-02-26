import { PropagateLoader } from "react-spinners";

interface InputScreenProps {
    isLoading: boolean;
    handleFileInput: () => void;
}

export default function InputScreen({
    isLoading,
    handleFileInput,
}: InputScreenProps) {
    return (
        <div className="input">
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
