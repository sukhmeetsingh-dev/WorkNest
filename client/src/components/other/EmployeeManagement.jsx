import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import CustomModal from "./CustomModal.jsx";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const [editForm, setEditForm] = useState({
    firstName: "",
    email: "",
    password: "",
  });

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

  const handleUpdateEmployee = async () => {
    try {
      await axiosInstance.put(
        `/api/auth/employees/${employeeToEdit._id}`,
        editForm,
      );

      toast.success("Employee updated successfully");

      setEmployeeToEdit(null);

      setEditForm({
        firstName: "",
        email: "",
        password: "",
      });

      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update employee");
    }
  };

  return (
    <div className="p-2">
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

                <td className="border border-gray-400 p-2 text-center align-middle">
                  <div className="flex gap-2 justify-center items-center">
                    <button
                      onClick={() => {
                        setEmployeeToEdit(employee);

                        setEditForm({
                          firstName: employee.firstName || "",
                          email: employee.email || "",
                          password: "",
                        });
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setEmployeeToDelete(employee)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
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

      <CustomModal
        isOpen={!!employeeToEdit}
        title="Edit Employee"
        onClose={() => setEmployeeToEdit(null)}
        onConfirm={handleUpdateEmployee}
        confirmText="Save Changes"
        confirmButtonClass="bg-blue-600 hover:bg-blue-700"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={editForm.firstName}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                firstName: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
            placeholder="Employee Name"
          />

          <input
            type="email"
            value={editForm.email}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                email: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
            placeholder="Employee Email"
          />

          <input
            type="password"
            value={editForm.password}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                password: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
            placeholder="New Password"
          />
        </div>
      </CustomModal>

      <CustomModal
        isOpen={!!employeeToDelete}
        title="Confirm Deletion"
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={() => handleDeleteEmployee(employeeToDelete._id)}
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      >
        <p className="text-gray-700">
          Are you sure you want to remove{" "}
          <span className="font-semibold">{employeeToDelete?.firstName}</span>?
        </p>
      </CustomModal>
    </div>
  );
};

export default EmployeeManagement;
