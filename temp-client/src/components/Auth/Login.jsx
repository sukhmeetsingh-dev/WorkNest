import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleLogin(email, password);
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-white text-black">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-6 tracking-wide text-blue-700">
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
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-72 border-2 text-xl py-3 px-5 rounded-full mb-4 bg-gray-100 border-blue-900 text-black"
              type="password"
              placeholder="Enter your password"
            />
            <button
              type="submit"
              disabled={loading}
              className={`mt-3 w-full text-white font-semibold text-xl py-3 rounded-full ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
