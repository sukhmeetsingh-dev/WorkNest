import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import CustomModal from "./CustomModal";
import toast from "react-hot-toast";

const AllTask_Admin = ({
  tasks = [],
  refreshTasks,
  loading,
  currentPage,
  totalPages,
}) => {
  const [employees, setEmployees] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    status: "pending",
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB");
  };

  const getDeadlineStatus = (dueDate) => {
    if (!dueDate) return null;

    const today = new Date();
    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        label: "Overdue",
        className: "bg-red-100 text-red-700",
      };
    }

    if (diffDays === 0) {
      return {
        label: "Due Today",
        className: "bg-yellow-100 text-yellow-700",
      };
    }

    if (diffDays <= 2) {
      return {
        label: "Due Soon",
        className: "bg-orange-100 text-orange-700",
      };
    }

    return {
      label: "On Track",
      className: "bg-green-100 text-green-700",
    };
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/employees");
        setEmployees(res.data || []);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  const applyFilters = (newStatus, newEmployee) => {
    refreshTasks(
      {
        status: newStatus,
        employee: newEmployee,
      },
      1,
    );
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    applyFilters(value, employeeFilter);
  };

  const handleEmployeeChange = (e) => {
    const value = e.target.value;
    setEmployeeFilter(value);
    applyFilters(statusFilter, value);
  };

  const resetFilters = () => {
    setStatusFilter("all");
    setEmployeeFilter("all");
    refreshTasks({}, 1);
  };

  const goToPage = (page) => {
    refreshTasks(
      {
        status: statusFilter,
        employee: employeeFilter,
      },
      page,
    );
  };

  const handleUpdateTask = async () => {
    try {
      await axiosInstance.put(`/api/tasks/${editingTask._id}`, editForm);
      toast.success("Task updated successfully");

      setEditingTask(null);

      refreshTasks(
        {
          status: statusFilter,
          employee: employeeFilter,
        },
        currentPage,
      );
    } catch (err) {
      console.error("Failed to update task:", err);
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axiosInstance.delete(`/api/tasks/${taskId}`);
      toast.success("Task deleted successfully");
      setTaskToDelete(null);

      refreshTasks(
        {
          status: statusFilter,
          employee: employeeFilter,
        },
        currentPage,
      );
    } catch (err) {
      console.error("Failed to delete task:", err);
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-blue-700">All Tasks</h3>

        <button
          onClick={() => refreshTasks({}, currentPage)}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition"
        >
          {loading ? "Refreshing..." : "🔄 Refresh"}
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="border p-2 rounded-lg"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="working">Working</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>

        <select
          value={employeeFilter}
          onChange={handleEmployeeChange}
          className="border p-2 rounded-lg"
        >
          <option value="all">All Employees</option>

          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.firstName}
            </option>
          ))}
        </select>

        <button
          onClick={resetFilters}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          Reset Filters
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-400 p-2">Title</th>
              <th className="border border-gray-400 p-2">Assigned To</th>
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
                  {task.assignedTo?.firstName || "Unassigned"}
                </td>

                <td className="border border-gray-400 p-2">
                  <div className="flex flex-col gap-1">
                    <span>{formatDate(task.dueDate)}</span>

                    {getDeadlineStatus(task.dueDate) && (
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${getDeadlineStatus(task.dueDate).className}`}
                      >
                        {getDeadlineStatus(task.dueDate).label}
                      </span>
                    )}
                  </div>
                </td>

                <td className="border border-gray-400 p-2 capitalize">
                  {task.status}
                </td>
                <td className="border border-gray-400 p-2">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setEditingTask(task);

                        setEditForm({
                          title: task.title || "",
                          description: task.description || "",
                          assignedTo: task.assignedTo?._id || "",
                          dueDate: task.dueDate
                            ? new Date(task.dueDate).toISOString().split("T")[0]
                            : "",
                          status: task.status || "pending",
                        });
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setTaskToDelete(task)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {tasks.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-4 text-gray-500 italic"
                >
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Task*/}
      <CustomModal
        isOpen={!!editingTask}
        title="Edit Task"
        onClose={() => setEditingTask(null)}
        onConfirm={handleUpdateTask}
        confirmText="Save Changes"
        confirmButtonClass="bg-blue-600 hover:bg-blue-700"
        maxWidth="max-w-lg"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={editForm.title}
            onChange={(e) =>
              setEditForm({ ...editForm, title: e.target.value })
            }
            className="w-full border p-3 rounded-lg"
            placeholder="Task Title"
          />

          <textarea
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
            className="w-full border p-3 rounded-lg"
            placeholder="Description"
          />

          <select
            value={editForm.assignedTo}
            onChange={(e) =>
              setEditForm({ ...editForm, assignedTo: e.target.value })
            }
            className="w-full border p-3 rounded-lg"
          >
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.firstName}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={editForm.dueDate}
            onChange={(e) =>
              setEditForm({ ...editForm, dueDate: e.target.value })
            }
            className="w-full border p-3 rounded-lg"
          />

          <select
            value={editForm.status}
            onChange={(e) =>
              setEditForm({ ...editForm, status: e.target.value })
            }
            className="w-full border p-3 rounded-lg"
          >
            <option value="pending">Pending</option>
            <option value="working">Working</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </CustomModal>

      <CustomModal
        isOpen={!!taskToDelete}
        title="Confirm Task Deletion"
        onClose={() => setTaskToDelete(null)}
        onConfirm={() => handleDeleteTask(taskToDelete._id)}
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      >
        <p className="text-gray-700">
          Are you sure you want to delete task
          <span className="font-semibold"> {taskToDelete?.title}</span> ?
        </p>
      </CustomModal>
    </div>
  );
};

export default AllTask_Admin;
