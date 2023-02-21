import { useCallback, useEffect, useRef } from "react";

const useClickOutside = (callback) => {
  const domNode = useRef();

  const cb = useCallback(
    () => callback(),
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!domNode.current?.contains(e.target)) {
        cb();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cb]);

  return domNode;
};

export default useClickOutside;
