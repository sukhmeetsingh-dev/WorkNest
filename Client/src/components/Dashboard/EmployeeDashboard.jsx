import React, { useContext } from "react";
import Header from "../other/Header";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";

const EmployeeDashboard = ({ changeUser, data }) => {

  return (
    <div
      className="bg-white text-black min-h-screen" 
    >
      {/* Header with greeting + controls */}
      <header className="p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl text-blue-600 font-semibold">
          Hello <span className="text-3xl text-blue-600 font-bold">{data?.firstName} 👋🏻</span>
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
