import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) setDarkMode(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.className = darkMode
      ? "bg-zinc-900 text-white"
      : "bg-white text-black";
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;