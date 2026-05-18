import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../other/Header";
import CreateTask from "../other/CreateTask";
import AllTask_Admin from "../other/AllTask_Admin";
import TaskListNumber from "../other/TaskListNumbers";
import axiosInstance from "../../utils/axiosInstance";
import ActivityFeed from "../other/ActivityFeed";

const AdminDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});

  // Fetch all tasks once (admin route)
 const fetchTasks = async (filters = {}, page = 1) => {
  try {
    setLoading(true);

    const mergedFilters = {
      ...activeFilters,
      ...filters,
      page,
      limit: 10,
    };

    setActiveFilters(mergedFilters);

    const query = new URLSearchParams(mergedFilters).toString();

    const res = await axiosInstance.get(`/api/tasks?${query}`);

    setTasks(res.data.tasks || []);
    setCurrentPage(res.data.currentPage || 1);
    setTotalPages(res.data.totalPages || 1);
  } catch (err) {
    console.error("Admin failed to fetch tasks:", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchTasks();
  }, []);

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

        <TaskListNumber tasks={tasks} />
        <ActivityFeed />
        <CreateTask refreshTasks={fetchTasks} />
        <AllTask_Admin
          tasks={tasks}
          refreshTasks={fetchTasks}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
