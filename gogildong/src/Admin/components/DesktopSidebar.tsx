import { NavLink } from 'react-router-dom';

import HomeIcon from '@/assets/Common/icon_pc_school.svg?react';
import ReportIcon from '@/assets/Common/icon_pc_camera.svg?react';
import RequestIcon from '@/assets/Common/icon_pc_request.svg?react';
import MapIcon from '@/assets/Common/icon_pc_map.svg?react';
import StatsIcon from '@/assets/Common/icon_pc_statistics.svg?react';
import LogoutIcon from '@/assets/Common/icon_pc_logout.svg?react';
import LogoIcon from '@/Admin/assets/svgs/destop-logo.svg?react';

type NavItem = {
  to: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const MAIN_ITEMS: NavItem[] = [
  { to: '/desktop/schools', label: '학교 목록', Icon: HomeIcon },
  { to: '/desktop/reports', label: '제보 관리', Icon: ReportIcon },
  { to: '/desktop/requests', label: '열람 요청 관리', Icon: RequestIcon },
  { to: '/desktop/buildings', label: '건물 도면 관리', Icon: MapIcon },
  { to: '/desktop/stats', label: '통계', Icon: StatsIcon }
];

export default function Sidebar() {
  return (
    <aside className="flex h-full w-full flex-col bg-white">
      {/* 로고 */}
      <div className="flex items-center py-9 pl-10">
        <LogoIcon role="img" aria-label="서비스 로고" />
      </div>

      {/* 메뉴*/}
      <div className="flex w-full justify-center border-b-2 border-gray-20">
        <nav>
          <ul className="flex w-full flex-col items-start gap-2">
            {MAIN_ITEMS.map(({ to, label, Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex h-[72px] w-[190px] items-center gap-6 rounded-[20px] ${
                      isActive ? 'bg-neon-60' : 'bg-white'
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
      <div className="flex w-full justify-center">
        <button
          type="button"
          className="flex h-[72px] w-[190px] items-center gap-6 rounded-[20px] bg-white"
        >
          <LogoutIcon className="h-10 w-10" />
          <span className="text-heading-md text-black">로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
