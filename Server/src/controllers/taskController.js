import Task from "../models/task.js";
import User from "../models/user.js";
import mongoose from "mongoose";

// Admin creates a task
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;

    // This check if user exists
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      return res.status(400).json({ msg: "Assigned user not found" });
    }

    // This will create task with correct ObjectId format
    const task = await Task.create({
      title,
      description,
      assignedTo: new mongoose.Types.ObjectId(assignedTo),
      dueDate,
    });

    res.status(201).json({ msg: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin fetches all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "firstName email");
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee fetches own tasks
export const getEmployeeTasks = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const tasks = await Task.find({ assignedTo: userId });
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update task (employee or admin)
export const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (
      req.user.role !== "admin" &&
      String(task.assignedTo) !== String(req.user._id)
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    const { status, title, description, dueDate, assignedTo } = req.body;
    const allowedStatuses = ["pending", "working", "failed", "completed"];
    if (status && allowedStatuses.includes(status)) {
      task.status = status;
    }
    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (assignedTo) task.assignedTo = assignedTo;

    await task.save();
    res.json({ task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
