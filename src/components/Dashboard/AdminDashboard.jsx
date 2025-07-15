import React, { useContext } from "react";
import Header from "../other/Header";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";

const AdminDashboard = ({ changeUser }) => {

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header with greeting and controls */}
      <header className="p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl text-blue-600 font-semibold">
          Hello <span className="text-3xl text-blue-600 font-bold">Admin 👋🏻</span>
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
