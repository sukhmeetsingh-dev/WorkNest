import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ThemeToggle from "../ThemeToggle";

const Header = ({ changeUser }) => {
  const { darkMode } = useContext(ThemeContext);

  const logOutUser = () => {
    localStorage.setItem("loggedInUser", "");
    changeUser("");
  };

  return (
    <div className="flex items-center space-x-4">
      <ThemeToggle />
      <button
        onClick={logOutUser}
        className="bg-red-500 text-lg font-medium text-white px-5 py-2 rounded-sm"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
