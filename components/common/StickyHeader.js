import { useState, useEffect, useRef, useCallback } from "react";

const StickyHeader = (defaultSticky = false) => {
  const [isSticky, setIsSticky] = useState(defaultSticky);
  const headerRef = useRef(null);

  const toggleSticky = useCallback(
    ({ top, bottom }) => {
      window.pageYOffset > bottom
      ? setIsSticky(true)
      : setIsSticky(false);
    },
    []
  );

  const debounce = (func, wait = 20, immediate = true) => {
    let timeOut;
    return () => {
      let context = this,
        args = arguments;
      const later = () => {
        timeOut = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeOut;
      clearTimeout(timeOut);
      timeOut = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      toggleSticky(headerRef.current.getBoundingClientRect());
    };
    window.addEventListener("scroll", debounce(handleScroll));

    return () => {
      window.removeEventListener("scroll", debounce(handleScroll));
    };
  }, [toggleSticky]);

  return { headerRef, isSticky };
};

export default StickyHeader;
