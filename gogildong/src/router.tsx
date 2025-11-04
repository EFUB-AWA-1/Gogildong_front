import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./common/layout/MainLayout";
import Report from "./report/pages/Report";
import Home from "./Home/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/report", element: <Report /> },
    ],
  },
]);

export default router;
