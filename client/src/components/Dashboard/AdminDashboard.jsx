import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../other/Header";
import CreateTask from "../other/CreateTask"
import AllTask_Admin from "../other/AllTask_Admin";
import TaskListNumber from "../other/TaskListNumbers";
import axiosInstance from "../../utils/axiosInstance";

const AdminDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all tasks once (admin route)
  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/api/tasks");
      setTasks(res.data.tasks || []);
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
        <CreateTask refreshTasks={fetchTasks} />
        <AllTask_Admin tasks={tasks} refreshTasks={fetchTasks} loading={loading} />
      </div>
    </div>
  );
};

export default AdminDashboard;
