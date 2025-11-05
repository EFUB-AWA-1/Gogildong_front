import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './common/layout/MainLayout';
import Home from './Home/pages/Home';
import PhotoReport from './Report/pages/PhotoReport';
import Report from './Report/pages/Report';
import School from './School/pages/School';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/home', element: <Home /> },
      {
        path: '/school',
        element: <School />,
      },
    ],
  },
  { path: '/school/report', element: <Report /> },
  { path: '/school/report/camera', element: <PhotoReport /> },
]);

export default router;
