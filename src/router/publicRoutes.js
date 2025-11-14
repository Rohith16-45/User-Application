import Login from "../pages/auth/Login";
import RegisterUser from "../pages/auth/registerUser";
import VerifyEmail from "../pages/auth/verifyUser";

export const publicRoutes = [
  {
    path: "/",
    element: Login,
  },
  {
    path: "/register",
    element: RegisterUser,
  },
  {
    path: "/verify-email/:userId/:token",
    element: VerifyEmail,
  },

  //add more public routes here
];
