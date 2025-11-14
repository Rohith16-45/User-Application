import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk } from "../../features/user/authThunk";
import { User, Mail, Lock, Save, X, Edit } from "lucide-react";

export default function UserProfile() {
  const dispatch = useDispatch();

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const { loading } = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load user into state
  useEffect(() => {
    if (loggedUser) {
      setUserData({
        name: loggedUser.name,
        email: loggedUser.email,
        password: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Enable editing mode
  const handleUpdateProfile = () => {
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    if (loggedUser) {
      setUserData({
        name: loggedUser.name,
        email: loggedUser.email,
        password: "",
      });
    }
  };

  // Save changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    dispatch(updateUserThunk({ id: loggedUser.id, body }))
      .unwrap()
      .then((res) => {
        const updated = {
          id: loggedUser.id,
          name: res.data.name,
          email: res.data.email,
          token: loggedUser.token,
        };
        localStorage.setItem("loggedInUser", JSON.stringify(updated));

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Your Profile</h2>
            <p className="text-gray-500 mt-2">
              Manage your account information
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none transition ${
                    isEditing
                      ? "focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      : "bg-gray-50 text-gray-500 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none transition ${
                    isEditing
                      ? "focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      : "bg-gray-50 text-gray-500 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  required
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none transition ${
                    isEditing
                      ? "focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      : "bg-gray-50 text-gray-500 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleUpdateProfile}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition flex items-center justify-center gap-2 cursor-pointer"
                  disabled={loading}
                >
                  <Edit className="w-5 h-5" />
                  Update Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className={`flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition flex items-center justify-center gap-2 ${
                      loading ? "cursor-not-allowed" : "pointer"
                    }`}
                    disabled={loading}
                  >
                    <Save className="w-5 h-5" />
                    {loading ? "Updating..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className={`flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 transition flex items-center justify-center gap-2 ${
                      loading ? "cursor-not-allowed" : "pointer"
                    }`}
                    disabled={loading}
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          {isEditing
            ? "All changes will be saved securely"
            : "Click 'Update Profile' to edit your information"}
        </p>
      </div>
    </div>
  );
}
