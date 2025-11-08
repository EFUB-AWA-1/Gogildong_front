import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './common/layout/MainLayout';
import FacilityViewDetail from './FacilityView/pages/FacilityViewDetail';
import Home from './Home/pages/Home';
import InfoRequest from './Home/pages/InfoRequest';
import SearchDetail from './Home/pages/SearchDetail';
import PhotoReport from './Report/pages/PhotoReport';
import ReportFlow from './Report/pages/ReportFlow';
import ReportStart from './Report/pages/ReportStart';
import School from './School/pages/School';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/school/request', element: <InfoRequest /> },
      { path: '/search', element: <SearchDetail /> },
      {
        path: '/school/:id',
        element: <School />
      }
    ]
  },
  { path: '/school/report', element: <ReportStart /> },
  { path: '/school/report/camera', element: <PhotoReport /> },
  { path: '/school/report/form', element: <ReportFlow /> },

  { path: '/school/facility/:id', element: <FacilityViewDetail /> }
]);

export default router;
