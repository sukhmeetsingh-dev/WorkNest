import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const ActivityFeed = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivityLogs = async () => {
    try {
      const res = await axiosInstance.get("/api/activity");
      setLogs(res.data.logs || []);
    } catch (err) {
      console.error("Failed to fetch activity logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivityLogs();
  }, []);

  const formatTime = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-2">

      {loading ? (
        <p className="text-gray-500">Loading activity...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-500">No activity found.</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-6">
          {logs.map((log) => (
            <div
              key={log._id}
              className="border-b pb-3 last:border-b-0"
            >
              <p className="text-sm font-medium text-gray-800">
                {log.user?.firstName || "Unknown User"}
              </p>

              <p className="text-gray-600 text-sm">
                {log.details}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {formatTime(log.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;