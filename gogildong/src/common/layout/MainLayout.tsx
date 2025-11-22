import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[480px] min-w-[320px] flex-col border border-gray-300 bg-white">
      <Outlet />
    </main>
  );
}
