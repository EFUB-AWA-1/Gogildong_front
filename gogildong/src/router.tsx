import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './common/layout/MainLayout';
import Home from './Home/pages/Home';
import School from './School/pages/School';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/school', element: <School /> },
    ],
  },
]);

export default router;
