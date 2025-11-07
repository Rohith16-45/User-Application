import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../features/auth/authThunk";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const {
    loading,
    success,
    user: registeredUser,
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerThunk(user));
  };

  useEffect(() => {
    if (success && registeredUser?.data) {
      localStorage.setItem("verifyEmail", registeredUser.data.email);
      const userId = registeredUser.data.id;
      console.log(userId);
      const token = registeredUser.data.emailVerificationTOken;
      console.log(token);
      navigate(`/verify-email/${userId}/${token}`);
    }
  }, [success, registeredUser, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 w-full max-w-md rounded-2xl shadow-xl relative">
        {/* Gradient border top */}
        <div className="absolute inset-0 rounded-2xl p-0.5 bg-linear-to-r from-purple-500 to-indigo-600 -z-10"></div>

        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Register User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
             focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
             focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
             focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-transparent"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition 
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <br></br>
        <p>
          Already a user..?{" "}
          <Link to="/login">
            <span className="text-blue-500">Login here</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
