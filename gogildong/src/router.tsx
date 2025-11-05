import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './common/layout/MainLayout';
import Home from './Home/pages/Home';
import School from './School/pages/School';
import Report from './Report/pages/Report';

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
]);

export default router;
