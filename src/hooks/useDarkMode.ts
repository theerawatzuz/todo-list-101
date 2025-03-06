import { useState, useEffect, useCallback } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.theme = newMode ? "dark" : "light";
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
};
