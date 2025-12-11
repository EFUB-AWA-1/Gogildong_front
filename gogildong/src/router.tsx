import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import MainLayout from './common/layout/MainLayout';
import Home from './Home/pages/Home';
import InfoRequest from './Home/pages/InfoRequest';
import SearchDetail from './Home/pages/SearchDetail';
import Login from './Login/pages/Login';
import PhotoReport from './Report/pages/PhotoReport';
import PhotoDetail from './ReportView/pages/PhotoDetail';
import PhotoList from './ReportView/pages/PhotoList';
import ReviewDetail from './ReportView/pages/ReviewDetail';
import ReviewWrite from './ReportView/pages/ReviewWrite';
import School from './School/pages/School';
import SignupAdmin from './Signup/pages/SignupAdmin';
import SignupExternal from './Signup/pages/SignupExternal';
import SignupInternal from './Signup/pages/SignupInternal';
import SignupSelectRole from './Signup/pages/SignupSelectRole';
import SignupSuccess from './Signup/pages/SignupSuccess';
import ReportStart from '@/Report/pages/ReportStart';
import ReportFlow from '@/Report/pages/ReportFlow';
import ReportSuccess from '@/Report/pages/ReportSuccess';
import ProtectedRoute from '@/ProtectedRoute';
import Mypage from './Mypage/pages/Mypage';
import FacilityViewDetail from '@/FacilityView/pages/FacilityViewDetail';
import FacilityReviewList from '@/FacilityView/pages/FacilityReviewList';
import PublicRoute from '@/PublicRoute';
import DesktopLayout from '@/common/layout/DesktopLayout';
import DashBoard from '@/Desktop/pages/DashBoard';
import GildongHome from '@/Gildong/pages/GildongHome';
import QuizPage from '@/Gildong/pages/QuizPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        element: (
          <PublicRoute>
            <Outlet />
          </PublicRoute>
        ),
        children: [
          { index: true, element: <Navigate to="/login" replace /> },
          { path: '/login', element: <Login /> },
          { path: '/signup', element: <SignupSelectRole /> },
          { path: '/signup/admin', element: <SignupAdmin /> },
          { path: '/signup/internal', element: <SignupInternal /> },
          { path: '/signup/external', element: <SignupExternal /> },
          { path: '/signup/success', element: <SignupSuccess /> }
        ]
      },

      {
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: '/home', element: <Home /> },
          { path: '/school/:id/request', element: <InfoRequest /> },
          { path: '/search', element: <SearchDetail /> },
          { path: '/school/:id', element: <School /> },
          { path: '/school/facility/:id', element: <FacilityViewDetail /> },
          {
            path: '/school/facility/:id/reviews',
            element: <FacilityReviewList />
          },
          { path: '/school/view/photos', element: <PhotoList /> },
          { path: '/school/view/photos/detail', element: <PhotoDetail /> },
          { path: '/school/view/review/write', element: <ReviewWrite /> },
          { path: '/school/view/review', element: <ReviewDetail /> },
          { path: '/school/:id/report', element: <ReportStart /> },
          {
            path: '/school/:id/report/:facilityType/camera',
            element: <PhotoReport />
          },
          {
            path: '/school/:id/report/:facilityType/form',
            element: <ReportFlow />
          },
          {
            path: '/school/:id/report/:facilityType/success',
            element: <ReportSuccess />
          },
          {
            path: '/school/:id/report/:facilityType/uploaded',
            element: <ReportSuccess />
          },
          { path: '/mypage', element: <Mypage /> },
          { path: '/gildong', element: <GildongHome /> },
          { path: '/quiz', element: <QuizPage />},
        ]
      }
    ]
  },
  {
    path: '/desktop',
    element: <DesktopLayout />,
    children: [
      { index: true, element: <DashBoard /> },
      { path: 'stats', element: <DashBoard /> },
      { path: 'schools', element: <div>학교 목록</div> },
      { path: 'reports', element: <div>제보 관리</div> },
      { path: 'requests', element: <div>열람 요청 관리</div> },
      { path: 'buildings', element: <div>건물 도면 관리</div> }
    ]
  }
]);

export default router;
