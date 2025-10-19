import React from "react";
import NewTask from "../Img/NewTask.png";
import TaskAccept from "../Img/TaskAccept.png";
import TaskCompleted from "../Img/TaskCompleted.png";
import TaskFailed from "../Img/TaskFailed.png";

const TaskListNumbers = ({ data }) => {
  return (
    <div className="flex mt-10 justify-between gap-5 screen">
      <div className="flex items-center space-x-2 mt-2 ml-2 rounded-xl w-[45%] h-[45%] py-6 px-9 bg-[#8AB2E5]">
        <h2 className="text-3xl font-semibold">{data.taskNumbers.newTask}</h2>
        <h2 className="text-xl font-medium">&nbsp;New Task</h2>
        <img src={NewTask} className="w-16 h-16 float-right ml-2" alt="New Task Icon" />
      </div>
      <div className="flex items-center space-x-2 mt-2 ml-2 rounded-xl w-[45%] h-[45%] py-6 px-9 bg-[#8AB2E5]">
        <h2 className="text-3xl font-semibold">{data.taskNumbers.completed}</h2>
        <h3 className="text-xl font-medium">Completed Task</h3>
        <img src={TaskCompleted} className="w-16 h-16 float-right ml-2" alt="Completed Task Icon" />
      </div>
      <div className="flex items-center space-x-2 mt-2 ml-2 rounded-xl w-[45%] h-[45%] py-6 px-9 bg-[#8AB2E5]">
        <h2 className="text-3xl font-semibold">{data.taskNumbers.active}</h2>
        <h3 className="text-xl font-medium">Accepted Task</h3>
        <img src={TaskAccept} className="w-16 h-16 float-right ml-2" alt="Accepted Task Icon" />
      </div>
      <div className="flex items-center space-x-2 mt-2 ml-2 rounded-xl w-[45%] h-[45%] py-6 px-9 bg-[#8AB2E5]">
        <h2 className="text-3xl font-semibold">{data.taskNumbers.failed}</h2>
        <h3 className="text-xl font-medium">Failed Task</h3>
        <img src={TaskFailed} className="w-16 h-16 float-right ml-2" alt="Failed Task Icon" />
      </div>
    </div>
  );
};

export default TaskListNumbers;
