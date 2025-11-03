import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './common/layout/MainLayout';
import Report from './report/pages/Report';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [{ path: '/report', element: <Report /> }],
  },
]);

export default router;
