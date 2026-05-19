import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/employees");
      setEmployees(res.data || []);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axiosInstance.delete(`/api/auth/employees/${employeeId}`);
      toast.success("Employee deleted successfully");
      setEmployeeToDelete(null);
      fetchEmployees();
    } catch (err) {
      toast.error(
        err.response?.data?.msg || "Cannot delete employee with assigned tasks",
      );
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">
        Employee Management
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-400 p-2">Name</th>
              <th className="border border-gray-400 p-2">Email</th>
              <th className="border border-gray-400 p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className="border border-gray-400 p-2">
                  {employee.firstName}
                </td>

                <td className="border border-gray-400 p-2">{employee.email}</td>

                <td className="border border-gray-400 p-2">
                  <button
                    onClick={() => setEmployeeToDelete(employee)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-4 text-gray-500 italic"
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {employeeToDelete && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              Confirm Deletion
            </h3>

            <p className="text-gray-700 mb-6">
              Are you sure you want to remove{" "}
              <span className="font-semibold">
                {employeeToDelete.firstName}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEmployeeToDelete(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDeleteEmployee(employeeToDelete._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EmployeeManagement;
