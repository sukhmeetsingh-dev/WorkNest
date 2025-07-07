import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Header from "../other/Header";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";

const EmployeeDashboard = ({ changeUser, data }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-zinc-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Header with greeting + controls */}
      <header className="p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-semibold">
          Hello <span className="text-3xl font-bold">{data?.firstName} 👋🏻</span>
        </h1>
        <Header changeUser={changeUser} />
      </header>

      <main className="p-6 space-y-8">
        <TaskListNumbers data={data} />
        <TaskList data={data} />
      </main>
    </div>
  );
};

export default EmployeeDashboard;
