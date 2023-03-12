import { RefObject, useEffect, useRef } from "react";

function useClickOutside<T extends HTMLElement>(onClickOutside: () => void): RefObject<T> {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target as Node)) onClickOutside();
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [elementRef, onClickOutside]);

  return elementRef;
}

export default useClickOutside;
