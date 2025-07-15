import React, { useState, useContext, useRef, useEffect } from "react";
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
  const [error, setError] = useState("");

  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setFilteredUsers([]);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAssignChange = (e) => {
    const value = e.target.value;
    setAssignTo(value);
    const suggestions = userData
      .map((u) => u.firstName)
      .filter((name) => name.toLowerCase().includes(value.toLowerCase()));
    setFilteredUsers(suggestions);
    setHighlightIndex(-1);
    setError("");
  };

  const handleKeyDown = (e) => {
    if (filteredUsers.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < filteredUsers.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : filteredUsers.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightIndex >= 0) {
          selectUser(filteredUsers[highlightIndex]);
        } else {
          const match = userData.find(
            (u) => u.firstName.toLowerCase() === assignTo.toLowerCase()
          );
          if (!match) {
            setError("Please select a valid employee name from the list.");
            return;
          }
          setFilteredUsers([]);
        }
      }
    }
  };

  const selectUser = (name) => {
    setAssignTo(name);
    setFilteredUsers([]);
    setHighlightIndex(-1);
    setError("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const matchedUser = userData.find(
      (u) => u.firstName.toLowerCase() === assignTo.toLowerCase()
    );

    if (!matchedUser) {
      setError("Please select a valid employee name from the list.");
      return;
    }

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

    const updatedData = userData.map((user) => {
      if (user.firstName.toLowerCase() === assignTo.toLowerCase()) {
        return {
          ...user,
          tasks: [...user.tasks, newTask],
          taskNumbers: {
            ...user.taskNumbers,
            newTask: user.taskNumbers.newTask + 1,
          },
        };
      }
      return user;
    });

    setUserData(updatedData);
    setTaskDate("");
    setAssignTo("");
    setCategory("");
    setTaskDescription("");
    setTaskTitle("");
    setFilteredUsers([]);
    setHighlightIndex(-1);
    setError("");
  };

  return (
    <div className="p-5 bg-gray-300 text-black mt-5 rounded" >
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap w-full items-start justify-between"
      >
        <div className="w-1/2">
          <div>
            <h3 className="text-sm text-black mb-0.5">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-sm text-black py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Make a UI design"
            />
          </div>
          <div>
            <h3 className="text-sm text-black mb-0.5">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="text-sm text-black py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="date"
            />
          </div>
          <div className="relative" ref={dropdownRef}>
            <h3 className="text-sm text-black mb-0.5">Assign to</h3>
            <input
              value={assignTo}
              onChange={handleAssignChange}
              onKeyDown={handleKeyDown}
              className="text-sm text-black py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-1"
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
                    className={`px-3 py-1 cursor-pointer ${
                      highlightIndex === idx
                        ? "bg-blue-500"
                        : "hover:bg-blue-400"
                    }`}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>
          <div>
            <h3 className="text-sm text-black mb-0.5">Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm text-black py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Design, Development, etc."
            />
          </div>
        </div>

        <div className="w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-black mb-0.5">Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full h-44 text-sm text-black py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
          ></textarea>
          <button className=" text-white bg-blue-900 py-3 hover:bg-blue-600 px-5 rounded text-sm mt-4 w-full">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;