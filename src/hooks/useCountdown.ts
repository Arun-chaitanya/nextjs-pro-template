import { useEffect, useRef, useState } from "react";

const useCountdown = (date?: string, refresh = 1) => {
  const intervalId = useRef<NodeJS.Timer>();
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!date) return;
    setCountdown(new Date(date).getTime() - Date.now());
    intervalId.current = setInterval(() => {
      const newCountdown = new Date(date).getTime() - Date.now();
      setCountdown(newCountdown);
      if (newCountdown <= 0) intervalId.current && clearInterval(intervalId.current);
    }, refresh * 1000);
    return () => intervalId.current && clearInterval(intervalId.current);
  }, [date]);

  return Math.round(countdown / 1000);
};

export default useCountdown;
