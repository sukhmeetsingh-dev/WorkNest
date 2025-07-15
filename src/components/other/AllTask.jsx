import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AllTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  return (
    <div className="bg-gray-300 p-5 rounded mt-5">
      <div className="bg-gray-300 border-2 border-blue-900 py-2 px-4 flex justify-between rounded">
        <h2 className="text-lg font-medium w-1/5">Employee Name</h2>
        <h3 className="text-lg font-medium w-1/5">New Task</h3>
        <h5 className="text-lg font-medium w-1/5">Active Task</h5>
        <h5 className="text-lg font-medium w-1/5">Completed</h5>
        <h5 className="text-lg font-medium w-1/5">Failed</h5>
      </div>

      <div className="">
        {userData.map(function(elem, id) {
          return (
            <div key={id} className="border-2 border-blue-900 mb-2 mt-3 py-2 px-4 flex justify-between rounded">
              <h2 className="text-lg font-medium w-1/5 text-black">{elem.firstName}</h2>
              <h3 className="text-lg font-medium w-1/5 text-black">{elem.taskNumbers.newTask}</h3>
              <h5 className="text-lg font-medium w-1/5 text-black">{elem.taskNumbers.active}</h5>
              <h5 className="text-lg font-medium w-1/5 text-black">{elem.taskNumbers.completed}</h5>
              <h5 className="text-lg font-medium w-1/5 text-black">{elem.taskNumbers.failed}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllTask;
