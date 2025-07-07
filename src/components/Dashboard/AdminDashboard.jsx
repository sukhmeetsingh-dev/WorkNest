import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Header from "../other/Header";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";

const AdminDashboard = ({ changeUser }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-zinc-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Header with greeting and controls */}
      <header className="p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-semibold">
          Hello <span className="text-3xl font-bold">Admin 👋🏻</span>
        </h1>
        <Header changeUser={changeUser} />
      </header>

      <main className="p-6 space-y-8">
        <CreateTask />
        <AllTask />
      </main>
    </div>
  );
};

export default AdminDashboard;
