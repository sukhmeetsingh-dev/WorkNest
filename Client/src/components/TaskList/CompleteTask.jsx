import React from "react";

const CompleteTask = ({ tasks }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-3">✅ Completed Tasks</h2>
    {tasks.length === 0 ? (
      <p>No completed tasks</p>
    ) : (
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="p-4 bg-green-100 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default CompleteTask;
