import React from "react";
import Header from "../other/Header";
import TaskList from "../TaskList/TaskList"
import AllTask_Employee from "../other/AllTask_Employee";

const EmployeeDashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header user={user} onLogout={onLogout} />
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          {user?.firstName && (
            <span className="ml-2">{user.firstName}'s Dashboard</span>
          )}
        </h2>
        <TaskList />
        <AllTask_Employee />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
