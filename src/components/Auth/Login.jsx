import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className={`h-screen w-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Navbar */}
      <nav className="flex justify-end items-center p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`text-xl p-2 rounded-full transition-colors duration-300 ${darkMode ? 'bg-yellow-300 text-yellow-600' : 'bg-black text-white'}`}
        >
          {darkMode ? <FontAwesomeIcon icon={faSun} className="text-yellow-500" /> : <FontAwesomeIcon icon={faMoon} />}
        </button>
      </nav>

      {/* Page Content */}
      <div className="flex flex-col items-center justify-center h-[calc(100%-64px)]">
        <h1 className={`text-3xl font-bold mb-6 tracking-wide ${darkMode ? 'text-white' : 'text-red-900'}`}>WORKNEST</h1>
        <div className={`p-10 rounded-xl shadow-lg transition-colors duration-300 ${darkMode ? 'bg-zinc-800' : 'bg-gray-300'}`}>
          <form onSubmit={submitHandler} className="flex flex-col items-center">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-72 outline-none border-2 text-xl py-3 px-5 rounded-full mb-4 placeholder-gray-400 transition-colors duration-300 ${darkMode ? 'bg-transparent border-emerald-600 text-white' : 'bg-gray-100 border-blue-900 text-black'}`}
              type="email"
              placeholder="Enter your email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-72 outline-none border-2 text-xl py-3 px-5 rounded-full mb-4 placeholder-gray-400 transition-colors duration-300 ${darkMode ? 'bg-transparent border-emerald-600 text-white' : 'bg-gray-100 border-blue-900 text-black'}`}
              type="password"
              placeholder="Enter your password"
            />
            <button
              className={`mt-3 w-full text-white font-semibold text-xl py-3 rounded-full transition-colors duration-300 ${darkMode ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;