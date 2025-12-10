import { Outlet } from 'react-router-dom';
import DesktopSidebar from '@/common/components/DesktopSidebar';

export default function DesktopLayout() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-505">
      {/* 왼쪽 내비게이션 */}
      <aside className="flex w-96 shrink-0 flex-col items-center bg-white">
        <DesktopSidebar />
      </aside>

      {/* 오른쪽 컨텐츠 영역 (배경 + 기본 패딩) */}
      <main className="flex-1 bg-[#F5F5F5] px-10 py-8">
        <Outlet />
      </main>
    </div>
  );
}
