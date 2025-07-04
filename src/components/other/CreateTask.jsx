import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const assignRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (assignRef.current && !assignRef.current.contains(e.target)) {
        setFilteredUsers([]);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAssignChange = (e) => {
    const value = e.target.value;
    setAssignTo(value);
    const suggestions = userData
      .map((u) => u.firstName)
      .filter((name) => name.toLowerCase().includes(value.toLowerCase()));
    setFilteredUsers(suggestions);
    setHighlightIndex(-1);
  };

  const handleAssignKeyDown = (e) => {
    if (filteredUsers.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((prev) => (prev + 1) % filteredUsers.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightIndex >= 0) {
          selectUser(filteredUsers[highlightIndex]);
        } else if (!userData.some(user => user.firstName.toLowerCase() === assignTo.toLowerCase())) {
          setAssignTo("");
        }
        setFilteredUsers([]);
        setHighlightIndex(-1);
      }
    } else if (e.key === "Enter") {
      if (!userData.some(user => user.firstName.toLowerCase() === assignTo.toLowerCase())) {
        setAssignTo("");
      }
    }
  };

  const selectUser = (name) => {
    setAssignTo(name);
    setFilteredUsers([]);
    setHighlightIndex(-1);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!assignTo) return;

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };

    const data = userData;

    data.forEach(function (elem) {
      if (assignTo.toLowerCase() === elem.firstName.toLowerCase()) {
        elem.tasks.push(newTask);
        elem.taskNumbers.newTask = elem.taskNumbers.newTask + 1;
      }
    });
    setUserData(data);

    setTaskDate("");
    setAssignTo("");
    setCategory("");
    setTaskDescription("");
    setTaskTitle("");
    setFilteredUsers([]);
    setHighlightIndex(-1);
  };

  return (
    <div className="p-5 bg-[#1C1C1C] mt-5 rounded">
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap w-full items-start justify-between"
      >
        <div className="w-1/2">
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Make a UI design"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="date"
            />
          </div>
          <div className="relative" ref={assignRef}>
            <h3 className="text-sm text-gray-300 mb-0.5">Assign to</h3>
            <input
              value={assignTo}
              onChange={handleAssignChange}
              onKeyDown={handleAssignKeyDown}
              className="text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-1"
              type="text"
              placeholder="Employee name"
              autoComplete="off"
            />
            {filteredUsers.length > 0 && (
              <ul className="absolute bg-white text-black w-4/5 rounded shadow-md z-10">
                {filteredUsers.map((name, idx) => (
                  <li
                    key={idx}
                    onClick={() => selectUser(name)}
                    className={`px-3 py-1 cursor-pointer hover:bg-emerald-200 ${idx === highlightIndex ? 'bg-emerald-100' : ''}`}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Design, dev, etc"
            />
          </div>
        </div>

        <div className="w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full h-44 text-sm text-white py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
          ></textarea>
          <button className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
