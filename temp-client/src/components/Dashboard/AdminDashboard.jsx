import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../other/Header";
import CreateTask from "../other/CreateTask"
import AllTask_Admin from "../other/AllTask_Admin";
import TaskListNumber from "../other/TaskListNumbers"

const AdminDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black">
      <Header user={user} onLogout={onLogout} />

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-blue-700">
            Admin Dashboard
          </h2>

          <button
            onClick={() => navigate("/admin/create-employee")}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
          >
            Create Employee
          </button>
        </div>

        <TaskListNumber />
        <CreateTask />
        <AllTask_Admin />
      </div>
    </div>
  );
};

export default AdminDashboard;
