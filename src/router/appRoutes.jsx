import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute.jsx";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";
import NotFound from "../pages/notFound";
import PublicRoute from "./privateRoute.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <PublicRoute>
              <route.element />
            </PublicRoute>
          }
        />
      ))}

      {/* Private Routes */}
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute>
              <route.element />
            </ProtectedRoute>
          }
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
