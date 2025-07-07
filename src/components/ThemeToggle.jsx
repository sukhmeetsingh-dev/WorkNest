import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 rounded-full transition-colors duration-300 text-xl 
        ${darkMode ? "bg-yellow-300 text-yellow-600" : "bg-zinc-800 text-white"}`}
    >
      {darkMode ? (
        <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </button>
  );
};

export default ThemeToggle;
