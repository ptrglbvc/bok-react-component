import { useEffect } from "react";

export default function useLocalStorage(
  title: string,
  percentRead: number,
  padding: React.MutableRefObject<number>,
  fontSize: React.MutableRefObject<number>,
) {
  let json = "";
  useEffect(() => {
    if (percentRead > 0.00001) {
      /* eslint-disable */
      // eslint complains that it's not going persist between rerenders'
      // eslint complains a lot
      // its like my wife
      // wait
      // i dont have a wife
      // who am I
      // what am I doing
      json = JSON.stringify({
        percentRead: percentRead,
        padding: padding.current,
        fontSize: fontSize.current,
      });
      /* eslint-enable */
      localStorage.setItem(title, json);
    }
  }, [title, percentRead, padding.current, fontSize.current]);
}
