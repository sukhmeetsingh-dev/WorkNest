import React from "react";

const Header = ({ user, onLogout }) => {
  return (
    <header className="flex justify-between items-center px-8 py-4 shadow-md bg-[#E6E6E6]">
      <h1 className="text-2xl font-bold text-blue-700">
        WorkNest {user?.role === "admin" ? "Admin" : "Employee"}
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={onLogout}
          className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
