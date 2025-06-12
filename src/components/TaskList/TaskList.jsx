import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ data }) => {
  console.log(data);
  return (
    <div
      id="tasklist"
      className="h-[55%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-5  mt-10"
    >
      {data.tasks.map((elem, id) => {
        if (elem.active) {
          return <AcceptTask key={id} />;
        }
        if (elem.NewTask) {
          return <NewTask key={id} />;
        }
        if (elem.completed) {
          return <CompleteTask key={id} />;
        }
        if (elem.failed) {
          return <FailedTask key={id} />;
        }
      })}
    </div>
  );
};

export default TaskList;
