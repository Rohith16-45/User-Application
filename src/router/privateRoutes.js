import Home from "../pages/dashboard/dashboard";
import AllUsers from "../pages/users/allUsers";
import UpdateUser from "../pages/users/updateUser";

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
  //add more private routes here
];
