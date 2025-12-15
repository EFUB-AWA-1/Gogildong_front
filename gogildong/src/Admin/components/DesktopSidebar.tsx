import { NavLink } from 'react-router-dom';

import HomeIcon from '@/Admin/assets/svgs/icon_pc_school.svg?react';
import ReportIcon from '@/Admin/assets/svgs/icon_pc_camera.svg?react';
import RequestIcon from '@/Admin/assets/svgs/icon_pc_request.svg?react';
import MapIcon from '@/Admin/assets/svgs/icon_pc_map.svg?react';
import StatsIcon from '@/Admin/assets/svgs/icon_pc_statistics.svg?react';
import LogoutIcon from '@/Admin/assets/svgs/icon_pc_logout.svg?react';
import LogoIcon from '@/Admin/assets/svgs/destop-logo.svg?react';
import { useAuthStore } from '@/Login/stores/useAuthStore';
import { useUserStore } from '@/Mypage/stores/useUserStore';
import { useNavigate } from 'react-router-dom';

type NavItem = {
  to: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const MAIN_ITEMS: NavItem[] = [
  { to: '/admin/schools', label: '학교 목록', Icon: HomeIcon },
  { to: '/admin/reports', label: '제보 관리', Icon: ReportIcon },
  { to: '/admin/requests', label: '열람 요청 관리', Icon: RequestIcon },
  { to: '/admin/buildings', label: '건물 도면 관리', Icon: MapIcon },
  { to: '/admin/stats', label: '통계', Icon: StatsIcon }
];

export default function Sidebar() {
  const navigate = useNavigate();
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const logoutUser = useUserStore((state) => state.logout);

  const handleLogout = () => {
    clearTokens();
    logoutUser();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="z-9995 flex h-full w-full flex-col bg-white">
      {/* 로고 */}
      <div className="flex items-center py-9 pl-10">
        <LogoIcon role="img" aria-label="서비스 로고" />
      </div>

      {/* 메뉴*/}
      <div className="flex w-full flex-col items-center justify-center gap-2.5 border-b-2 border-gray-20 pb-5">
        <nav>
          <ul className="flex w-full flex-col gap-2">
            {MAIN_ITEMS.map(({ to, label, Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex h-[72px] w-[210px] items-center gap-6 rounded-[20px] px-2 ${
                      isActive ? 'bg-neon-60' : 'bg-white hover:bg-neon-15'
                    }`
                  }
                >
                  <div className="flex items-center gap-6">
                    <Icon className="h-10 w-10" />
                    <span className="text-heading-md whitespace-nowrap text-black">
                      {label}
                    </span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 로그아웃 */}
      <div className="flex w-full justify-center pt-5">
        <button
          type="button"
          onClick={handleLogout}
          className="flex h-[72px] w-[210px] items-center gap-6 rounded-[20px] bg-white px-2"
        >
          <LogoutIcon className="h-10 w-10" />
          <span className="text-heading-md text-black">로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
