import Home from "../pages/dashboard/dashboard";
import AllUsers from "../pages/users/allUsers";
import UpdateUser from "../pages/users/updateUser";
import UserProfile from "../pages/users/userProfile";
import About from "../about";

export const privateRoutes = [
  {
    path: "/users",
    element: AllUsers,
  },
  {
    path: "/home",
    element: Home,
  },
  {
    path: "/user-update/:id",
    element: UpdateUser,
  },
  {
    path: "/user/profile",
    element: UserProfile,
  },
  {
    path: "/about",
    element: About,
  },
  //add more private routes here
];
