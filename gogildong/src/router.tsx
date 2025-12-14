import DesktopLayout from '@/Admin/layout/DesktopLayout';
import DashBoard from '@/Admin/pages/DashBoard';
import RegisteredSchoolList from '@/Admin/pages/RegisteredSchoolList';
import FacilityReviewList from '@/FacilityView/pages/FacilityReviewList';
import FacilityViewDetail from '@/FacilityView/pages/FacilityViewDetail';
import GildongHome from '@/Gildong/pages/GildongHome';
import QuizCorrect from '@/Gildong/pages/QuizCorrect';
import QuizPage from '@/Gildong/pages/QuizPage';
import QuizWrong from '@/Gildong/pages/QuizWrong';
import ProtectedRoute from '@/ProtectedRoute';
import PublicRoute from '@/PublicRoute';
import ReportFlow from '@/Report/pages/ReportFlow';
import ReportStart from '@/Report/pages/ReportStart';
import ReportSuccess from '@/Report/pages/ReportSuccess';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import MainLayout from './common/layout/MainLayout';
import Home from './Home/pages/Home';
import InfoRequest from './Home/pages/InfoRequest';
import SearchDetail from './Home/pages/SearchDetail';
import Login from './Login/pages/Login';
import Mypage from './Mypage/pages/Mypage';
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
import RankingPage from '@/Gildong/pages/RankingPage';
import AllRankingPage from '@/Gildong/pages/AllRankingPage';
import ClosetPage from '@/Gildong/pages/ClosetPage';
import ShopPage from '@/Gildong/pages/ShopPage';

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
          { path: '/quiz/:quizId', element: <QuizPage />},
          { path: '/quiz/correct', element: <QuizCorrect />},
          { path: '/quiz/wrong', element: <QuizWrong />},
          { path: '/ranking', element: <RankingPage />},
          { path: '/ranking/all', element: <AllRankingPage />},
          { path: '/closet', element: <ClosetPage />},
          {path: '/shop', element: <ShopPage />},
        ]
      }
    ]
  },
  {
    path: '/admin',
    element: <DesktopLayout />,
    children: [
      { index: true, element: <DashBoard /> },
      { path: 'stats', element: <DashBoard /> },
      { path: 'schools', element: <RegisteredSchoolList /> },
      { path: 'reports', element: <div>제보 관리</div> },
      { path: 'requests', element: <div>열람 요청 관리</div> },
      { path: 'buildings', element: <div>건물 도면 관리</div> }
    ]
  }
]);

export default router;
