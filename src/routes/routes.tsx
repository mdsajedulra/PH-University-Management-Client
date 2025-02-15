import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Register from "../pages/Register";
import { routesGenerator } from "../lib/routesGenerator";
import { adminPaths } from "./admin.routes";
import Login from "../pages/student/Login";
import Protectedroute from "../components/layout/Protectedroute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Protectedroute><App /></Protectedroute>,
    children: routesGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routesGenerator(adminPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routesGenerator(adminPaths),
  },

  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
