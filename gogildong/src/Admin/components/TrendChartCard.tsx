import { useMemo, useState } from 'react';

import StatsCardLarge from '@/Admin/components/StatsCardLarge';

type TabKey = 'report' | 'request' | 'newUser' | 'school';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'report', label: '제보' },
  { key: 'request', label: '열람 요청' },
  { key: 'newUser', label: '신규 사용자' },
  { key: 'school', label: '참여 학교' }
];

// ✅ 일단 더미 데이터(탭별로 다르게)
const DATA_MAP: Record<TabKey, number[]> = {
  report: [10, 12, 6, 8, 7, 13, 12, 14],
  request: [4, 6, 3, 5, 6, 7, 8, 9],
  newUser: [30, 20, 25, 22, 28, 35, 33, 40],
  school: [1, 2, 2, 3, 3, 4, 4, 5]
};

export default function TrendChartCard() {
  const [activeTab, setActiveTab] = useState<TabKey>('report');

  const chartData = useMemo(() => DATA_MAP[activeTab], [activeTab]);

  return (
    <StatsCardLarge>
      <div className="flex w-full flex-col items-start gap-[1.31rem]">
        <div className="flex w-full items-center gap-2 px-3">
          {TABS.map(({ key, label }) => {
            const isActive = activeTab === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className="flex h-auto shrink-0 items-center justify-center p-2"
              >
                <span
                  className={`text-display-sm ${
                    isActive ? 'text-black' : 'text-gray-40'
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
        <div>chart</div>
      </div>
    </StatsCardLarge>
  );
}
