import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

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

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB");
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
      1
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
      page
    );
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
                  {formatDate(task.dueDate)}
                </td>

                <td className="border border-gray-400 p-2 capitalize">
                  {task.status}
                </td>
              </tr>
            ))}

            {tasks.length === 0 && (
              <tr>
                <td
                  colSpan="4"
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
    </div>
  );
};

export default AllTask_Admin;