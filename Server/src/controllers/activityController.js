import ActivityLog from "../models/activityLogs.js";

export const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user", "firstName email role")
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ logs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};