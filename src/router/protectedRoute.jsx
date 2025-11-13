import { Navigate } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLaout";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("loginToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProtectedRoute;
