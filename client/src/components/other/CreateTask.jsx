import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const CreateTask = () => {
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/employees");
        console.log("EMPLOYEES RESPONSE:", res.data);
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/api/tasks", form);

      alert("Task created successfully!");

      setForm({
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "", 
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">Create Task</h3>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <input
          type="text"
          placeholder="Task Title"
          className="w-full border p-3 rounded-lg"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        {/* Description */}
        <textarea
          placeholder="Task Description"
          className="w-full border p-3 rounded-lg"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Assign to Employee */}
        <select
          className="w-full border p-3 rounded-lg"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.firstName} ({emp.email})
            </option>
          ))}
        </select>

        {/* Due Date Input */}
        <input
          type="date"
          className="w-full border p-3 rounded-lg"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
