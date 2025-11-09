import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./common/layout/MainLayout";
import Home from "./Home/pages/Home";
import InfoRequest from "./Home/pages/InfoRequest";
import SearchDetail from "./Home/pages/SearchDetail";
import PhotoReport from "./Report/pages/PhotoReport";
import Report from "./Report/pages/Report";
import School from "./School/pages/School";
import ReportInfo from "./Report/pages/ReportInfo";
import PhotoList from "./ReportView/pages/PhotoList";
import PhotoDetail from "./ReportView/pages/PhotoDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/school/request", element: <InfoRequest /> },
      { path: "/search", element: <SearchDetail /> },
      {
        path: "/school/:id",
        element: <School />
      },
      { path: "/school/view/photos", element: <PhotoList /> },
      { path: "/school/view/photos/detail", element: <PhotoDetail /> }
    ]
  },
  { path: "/school/report", element: <Report /> },
  { path: "/school/report/camera", element: <PhotoReport /> },
  { path: "/school/report/info", element: <ReportInfo /> }
]);

export default router;
