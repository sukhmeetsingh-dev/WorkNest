// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-white text-black">
      <nav className="flex justify-end p-4"></nav>

      <div className="flex flex-col items-center justify-center h-[calc(100%-64px)]">
        <h1
          className="text-3xl font-bold mb-6 tracking-wide text-blue-700"
        >
          WORKNEST
        </h1>

        <div className="p-10 rounded-xl shadow-lg bg-[#DDDDDD]">
          <form onSubmit={submitHandler} className="flex flex-col items-center">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-72 border-2 text-xl py-3 px-5 rounded-full mb-4 bg-gray-100 border-blue-900 text-black"
              type="email"
              placeholder="Enter your email"
            />
            <div className="relative w-72 mb-4">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-2 text-xl py-3 px-5 rounded-full pr-12 bg-gray-100 border-blue-900 text-black"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-500"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <button className="mt-3 w-full text-white font-semibold text-xl py-3 rounded-full bg-blue-500 hover:bg-blue-600">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
