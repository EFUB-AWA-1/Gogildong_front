import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <main className="h-screen w-full border border-gray-300">
      <Outlet />
    </main>
  );
}
