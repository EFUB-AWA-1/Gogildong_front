import { Outlet } from 'react-router-dom';
import DesktopSidebar from '@/Admin/components/DesktopSidebar';

export default function DesktopLayout() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1920px] min-w-7xl">
      {/* 왼쪽 내비게이션 */}
      <aside className="flex w-[19%] flex-col bg-white">
        <DesktopSidebar />
      </aside>

      {/* 오른쪽 컨텐츠 영역 (배경 + 기본 패딩) */}
      <main className="flex-1 bg-gray-10 px-25 py-15">
        <Outlet />
      </main>
    </div>
  );
}
