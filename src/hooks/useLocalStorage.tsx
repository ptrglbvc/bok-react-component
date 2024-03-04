import { useEffect } from "react";

export default function useLocalStorage(title: string, percentRead: number) {
    let json = "";
    useEffect(() => {
        if (percentRead > 0.00001) {
            json = JSON.stringify({ percentRead: percentRead });
            console.log(json);
            localStorage.setItem(title, json);
        }
    }, [title, percentRead]);
}
