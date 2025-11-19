import React, { useEffect, useState } from "react";

const TaskListNumber = ({ tasks = [] }) => {
  const [counts, setCounts] = useState({
    total: 0,
    completed: 0,
    failed: 0,
    working: 0,
  });

  useEffect(() => {
    if (tasks.length) {
      const completed = tasks.filter((t) => t.status === "completed").length;
      const failed = tasks.filter((t) => t.status === "failed").length;
      const working = tasks.filter(
        (t) => t.status === "new" || t.status === "accepted"
      ).length;

      setCounts({
        total: tasks.length,
        completed,
        failed,
        working,
      });
    }
  }, [tasks]);

  return (
    <div className="flex gap-6 justify-center">
      <div className="bg-blue-100 px-6 py-3 rounded-lg shadow text-center">
        <p className="font-bold text-blue-700">Total</p>
        <p className="text-2xl">{counts.total}</p>
      </div>
      <div className="bg-green-100 px-6 py-3 rounded-lg shadow text-center">
        <p className="font-bold text-green-700">Completed</p>
        <p className="text-2xl">{counts.completed}</p>
      </div>
      <div className="bg-yellow-100 px-6 py-3 rounded-lg shadow text-center">
        <p className="font-bold text-yellow-700">Working</p>
        <p className="text-2xl">{counts.working}</p>
      </div>
      <div className="bg-red-100 px-6 py-3 rounded-lg shadow text-center">
        <p className="font-bold text-red-700">Failed</p>
        <p className="text-2xl">{counts.failed}</p>
      </div>
    </div>
  );
};

export default TaskListNumber;
