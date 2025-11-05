import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./common/layout/MainLayout";
import Report from "./report/pages/Report";
import Home from "./Home/pages/Home";
import InfoRequest from "./Home/pages/InfoRequest";
import SearchDetail from "./Home/pages/SearchDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/request", element: <InfoRequest /> },
      { path: "/search", element: <SearchDetail /> },
      { path: "/report", element: <Report /> },
    ],
  },
]);

export default router;
