import React from "react";

const NewTask = ({ tasks, onStatusChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">🆕 New Tasks</h2>
      {tasks.length === 0 ? (
        <p>No new tasks available</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onStatusChange(task._id, "accepted")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => onStatusChange(task._id, "failed")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewTask;

