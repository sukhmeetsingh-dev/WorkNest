import React from "react";

const NewTask = () => {
  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 text-sm px-3 py-1 rounded">High</h3>
        <h4>20 May 2025</h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">Make a Youtube video</h2>
      <p className="text-sm mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
        itaque qui suscipit consectetur modi iste.
      </p>
      <div className="mt-4">
        <button>Accept Task</button>
      </div>
    </div>
  );
};

export default NewTask;
