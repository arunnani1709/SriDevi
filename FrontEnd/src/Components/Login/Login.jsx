// src/components/LoginPage/Login.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(credentials));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Login successful!");
      navigate("/Home");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">Sri Devi Ayurveda Clinic</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Login;
