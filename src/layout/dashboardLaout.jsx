import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, Users, FileText, LogOut, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import Modal from "../components/modal";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleConfirmLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
    navigate("/");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };

  const greeting = getGreeting();

  const menuItems = [
    { name: "Home", icon: Home, path: "/home" },
    { name: "Users", icon: Users, path: "/users" },
    { name: "Profile", icon: User, path: "/user/profile" },
    { name: "About", icon: FileText, path: "/about" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm h-16 fixed top-0 left-0 right-0 z-50">
        <div className="h-full flex items-center justify-between px-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
              className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="ml-3 text-xl font-bold text-gray-800">
              My Application
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {greeting}, {user?.name || "Guest"}
            </span>

            {/* Logout with confirmation */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 bg-white shadow-lg z-40
  transform transition-transform duration-300 ease-in-out
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0
  lg:w-64 w-full`} // ← desktop = 64 | mobile = full screen
      >
        <nav className="h-full overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const ActiveIcon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-left ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ActiveIcon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="pt-16 lg:ml-64 min-h-screen">
        <div className="p-6">{children}</div>
      </main>

      <Modal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
        icon={<LogOut className="text-red-600" size={24} />}
        onConfirm={handleConfirmLogout}
        confirmText="Logout"
        cancelText="Cancel"
        confirmClassName="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
      >
        <p>Are you sure you want to log out? You will need to login again.</p>
      </Modal>
    </div>
  );
};

export default DashboardLayout;
