import { createBrowserRouter, Outlet } from "react-router-dom";
import MainLayout from "./common/layout/MainLayout";
import Home from "./Home/pages/Home";
import InfoRequest from "./Home/pages/InfoRequest";
import SearchDetail from "./Home/pages/SearchDetail";
import PhotoReport from "./Report/pages/PhotoReport";
import Report from "./Report/pages/Report";
import ReportInfo from "./Report/pages/ReportInfo";
import PhotoDetail from "./ReportView/pages/PhotoDetail";
import PhotoList from "./ReportView/pages/PhotoList";
import School from "./School/pages/School";
import SignupAdmin from "./Signup/pages/SignupAdmin";
import SignupExternal from "./Signup/pages/SignupExternal";
import SignupInternal from "./Signup/pages/SignupInternal";
import SignupSelectRole from "./Signup/pages/SignupSelectRole";
import SignupSuccess from "./Signup/pages/SignupSuccess";
import ReviewWrite from "./ReportView/pages/ReviewWrite";
import Login from "./Login/pages/Login";
import ReviewDetail from "./ReportView/pages/ReviewDetail";
import ProtectedRoute from "@/ProtectedRoute";
import Mypage from "./Mypage/pages/Mypage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignupSelectRole /> },
      { path: "/signup/admin", element: <SignupAdmin /> },
      { path: "/signup/internal", element: <SignupInternal /> },
      { path: "/signup/external", element: <SignupExternal /> },
      { path: "/signup/success", element: <SignupSuccess /> },

      {
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: "/home", element: <Home /> },
          { path: "/school/:id/request", element: <InfoRequest /> },
          { path: "/search", element: <SearchDetail /> },
          { path: "/school/:id", element: <School /> },
          { path: "/school/view/photos", element: <PhotoList /> },
          { path: "/school/view/photos/detail", element: <PhotoDetail /> },
          { path: "/school/view/review/write", element: <ReviewWrite /> },
          { path: "/school/view/review", element: <ReviewDetail /> },
          { path: "/school/report", element: <Report /> },
          { path: "/school/report/camera", element: <PhotoReport /> },
          { path: "/school/report/info", element: <ReportInfo /> },
          { path: "/mypage", element: <Mypage /> }
        ]
      }
    ]
  }
]);

export default router;
