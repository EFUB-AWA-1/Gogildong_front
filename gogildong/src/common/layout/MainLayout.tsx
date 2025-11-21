import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="mx-auto max-w-[480px] min-w-[320px] border border-gray-300">
      <Outlet />
    </main>
  );
}
