import Login from "../pages/auth/Login";
import RegisterUser from "../pages/auth/registerUser";
import VerifyEmail from "../pages/auth/verifyUser";
import UpdateUser from "../pages/users/updateUser";

export const publicRoutes = [
  {
    path: "/",
    element: RegisterUser,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/verify-email/:userId/:token",
    element: VerifyEmail,
  },
 
  //add more public routes here
];
