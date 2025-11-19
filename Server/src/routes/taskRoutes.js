import express from "express";
import {
  createTask,
  getAllTasks,
  getEmployeeTasks,
  updateTaskStatus,
} from "../controllers/taskController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, adminOnly, createTask);
router.get("/", protect, adminOnly, getAllTasks);
router.get("/my-tasks", protect, getEmployeeTasks);
router.put("/:id", protect, updateTaskStatus);

export default router;
