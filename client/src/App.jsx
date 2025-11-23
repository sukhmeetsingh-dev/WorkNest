import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../src/components/Auth/Login";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import CreateEmployee from "./components/Dashboard/CreateEmployee";

import axiosInstance from "./utils/axiosInstance";

const App = () => {
  const [user, setUser] = useState(null); // { id, firstName, role }
  const [loading, setLoading] = useState(true);

  // ✔ Auto-load user if token exists
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.get("/api/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ✔ Login handler
  const handleLogin = async (email, password) => {
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login error");
    }
  };

  // ✔ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/employee/dashboard" />
              )
            ) : (
              <Login handleLogin={handleLogin} />
            )
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            user?.role === "admin" ? (
              <AdminDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/admin/create-employee"
          element={
            user?.role === "admin" ? (
              <CreateEmployee user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* EMPLOYEE ROUTE */}
        <Route
          path="/employee/dashboard"
          element={
            user?.role === "employee" ? (
              <EmployeeDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
