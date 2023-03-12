import { useEffect, useRef, useState } from "react";

function useDimensions<T extends HTMLElement>(): [React.RefObject<T>, DOMRect | undefined] {
  const [dimensions, setDimension] = useState<DOMRect>();
  const ref = useRef<T>(null);

  const updateDimensions = () => {
    if (!ref.current) return;
    setDimension(ref.current.getBoundingClientRect().toJSON());
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    updateDimensions();
  }, [ref]);

  return [ref, dimensions];
}

export default useDimensions;
