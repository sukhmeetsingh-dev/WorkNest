import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const AllTask_Employee = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("api/tasks/my-tasks");
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const confirmAction = (taskId, action) => {
    const messages = {
      working: "Start working on this task?",
      completed: "Mark this task as completed?",
      failed: "Mark this task as failed?"
    };

    if (window.confirm(messages[action])) {
      updateStatus(taskId, action);
    }
  };

  // Format DD/MM/YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB");
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">My Tasks</h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-400 p-2">Title</th>
              <th className="border border-gray-400 p-2">Due Date</th>
              <th className="border border-gray-400 p-2">Status</th>
              <th className="border border-gray-400 p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className="border border-gray-400 p-2">{task.title}</td>

                <td className="border border-gray-400 p-2">
                  {formatDate(task.dueDate)}
                </td>

                <td className="border border-gray-400 p-2 capitalize">
                  {task.status}
                </td>

                <td className="border border-gray-400 p-2 space-x-2">
                  {/* Working Button */}
                  <button
                    onClick={() => confirmAction(task._id, "working")}
                    disabled={task.status === "working" || task.status === "completed"}
                    className={`px-3 py-1 rounded text-white ${
                      task.status === "working" || task.status === "completed"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    Working
                  </button>

                  {/* Complete Button */}
                  <button
                    onClick={() => confirmAction(task._id, "completed")}
                    disabled={task.status === "completed"}
                    className={`px-3 py-1 rounded text-white ${
                      task.status === "completed"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Complete
                  </button>

                  {/* Fail Button */}
                  <button
                    onClick={() => confirmAction(task._id, "failed")}
                    disabled={task.status === "failed"}
                    className={`px-3 py-1 rounded text-white ${
                      task.status === "failed"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    Fail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTask_Employee;
