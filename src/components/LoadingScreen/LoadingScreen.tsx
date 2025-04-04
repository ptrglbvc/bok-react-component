import { PropagateLoader } from "react-spinners";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  console.log("loading screen component mounted, you just fucked up the css");
  return (
    <div
      className={
        isLoading ? styles["loading-screen"] : styles["loading-screen-gon"]
      }
    >
      <div>
        <PropagateLoader color="red"></PropagateLoader>
      </div>
    </div>
  );
}
