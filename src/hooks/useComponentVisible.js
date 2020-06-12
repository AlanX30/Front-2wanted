import { useState, useEffect, useRef } from "react"

export function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, !isComponentVisible);
    document.addEventListener("click", handleClickOutside, !isComponentVisible);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, !isComponentVisible);
      document.removeEventListener("click", handleClickOutside, !isComponentVisible);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}