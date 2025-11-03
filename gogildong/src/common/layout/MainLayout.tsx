import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <main className=' w-full h-full border border-gray-300'>
      <Outlet />
    </main>
  );
}
