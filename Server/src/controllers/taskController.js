import Task from "../models/task.js";
import User from "../models/user.js";
import ActivityLog from "../models/activityLogs.js";
import mongoose from "mongoose";

// Admin creates a task
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;

    const assignedUser = await User.findById(assignedTo);

    if (!assignedUser) {
      return res.status(400).json({ msg: "Assigned user not found" });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo: new mongoose.Types.ObjectId(assignedTo),
      dueDate,
    });

    await ActivityLog.create({
      user: req.user._id,
      action: "task_created",
      targetType: "task",
      targetId: task._id,
      details: `Created task "${task.title}" for ${assignedUser.firstName}`,
    });

    res.status(201).json({
      msg: "Task created successfully",
      task,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin fetches all tasks
export const getAllTasks = async (req, res) => {
  try {
    const { status, employee, page = 1, limit = 10 } = req.query;

    const filters = {};

    if (status && status !== "all") {
      filters.status = status;
    }

    if (employee && employee !== "all") {
      filters.assignedTo = employee;
    }

    const currentPage = Number(page);
    const perPage = Number(limit);

    const totalTasks = await Task.countDocuments(filters);

    const tasks = await Task.find(filters)
      .populate("assignedTo", "firstName email")
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ dueDate: 1 });

    res.json({
      tasks,
      currentPage,
      totalPages: Math.ceil(totalTasks / perPage),
      totalTasks,
    });
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

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (
      req.user.role !== "admin" &&
      String(task.assignedTo) !== String(req.user._id)
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    const { status, title, description, dueDate, assignedTo } = req.body;

    const allowedStatuses = ["pending", "working", "failed", "completed"];

    let logAction = null;
    let logDetails = null;

    if (status && allowedStatuses.includes(status)) {
      task.status = status;

      if (status === "working") {
        logAction = "task_started";
        logDetails = `Started working on "${task.title}"`;
      }

      if (status === "completed") {
        logAction = "task_completed";
        logDetails = `Completed task "${task.title}"`;
      }

      if (status === "failed") {
        logAction = "task_failed";
        logDetails = `Marked task "${task.title}" as failed`;
      }
    }

    if (title) {
      task.title = title;
      logAction = "task_updated";
      logDetails = `Updated task title to "${title}"`;
    }

    if (description) {
      task.description = description;
    }

    if (dueDate) {
      task.dueDate = dueDate;
    }

    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);

      if (!assignedUser) {
        return res.status(400).json({ msg: "Assigned user not found" });
      }

      task.assignedTo = assignedTo;

      logAction = "task_reassigned";
      logDetails = `Reassigned "${task.title}" to ${assignedUser.firstName}`;
    }

    await task.save();

    if (logAction) {
      await ActivityLog.create({
        user: req.user._id,
        action: logAction,
        targetType: "task",
        targetId: task._id,
        details: logDetails,
      });
    }

    res.json({ task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Delete Task

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "firstName"
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    await ActivityLog.create({
      user: req.user._id,
      action: "task_deleted",
      targetType: "task",
      targetId: task._id,
      details: `Deleted task "${task.title}" assigned to ${task.assignedTo?.firstName || "Unknown User"}`,
    });

    await task.deleteOne();

    res.json({
      msg: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
