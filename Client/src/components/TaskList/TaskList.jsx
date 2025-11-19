import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const TaskList = ({ filter = "all" }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Updated stats (removed new + renamed accepted → working)
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    failed: 0,
    working: 0,
  });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/tasks/my-tasks");
      const myTasks = res.data.tasks || [];
      setTasks(myTasks);

      const total = myTasks.length;
      const completed = myTasks.filter((t) => t.status === "completed").length;
      const failed = myTasks.filter((t) => t.status === "failed").length;
      const working = myTasks.filter((t) => t.status === "accepted").length; // accepted renamed to working

      setStats({ total, completed, failed, working });
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading tasks...</p>;

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-blue-700">My Tasks</h3>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition"
        >
          {refreshing ? "Refreshing..." : "🔄 Refresh"}
        </button>
      </div>

      {/* Employee Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
          <p className="text-sm text-blue-800 font-semibold">Total</p>
          <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg shadow text-center">
          <p className="text-sm text-green-800 font-semibold">Completed</p>
          <p className="text-2xl font-bold text-green-700">
            {stats.completed}
          </p>
        </div>

        {/* Accepted → Working */}
        <div className="bg-yellow-100 p-4 rounded-lg shadow text-center">
          <p className="text-sm text-yellow-800 font-semibold">Working</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.working}</p>
        </div>

        {/* Removed NEW completely */}

        <div className="bg-red-100 p-4 rounded-lg shadow text-center">
          <p className="text-sm text-red-800 font-semibold">Failed</p>
          <p className="text-2xl font-bold text-red-700">{stats.failed}</p>
        </div>
      </div>

      {/* Task Cards */}
      {filteredTasks.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-lg transition-all duration-300"
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {task.title}
              </h4>

              <p className="text-sm text-gray-600 mb-3">
                {task.description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "failed"
                      ? "bg-red-100 text-red-700"
                      : task.status === "accepted"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {
                    task.status === "accepted"
                      ? "WORKING"
                      : task.status.toUpperCase()
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-10 text-gray-500">
          No tasks found for this filter.
        </p>
      )}
    </div>
  );
};

export default TaskList;
