import { useMemo, useState } from 'react';
import { mockStatistics } from '@/Admin/mocks/mockStatistics';
import StatsCardLarge from '@/Admin/components/StatsCardLarge';
import LineChart from '@/Admin/components/chart/LineChart';
import type { YearMonth } from '@/Admin/utils/dateRange';

type TabKey = 'report' | 'request' | 'newUser' | 'school';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'report', label: '제보' },
  { key: 'request', label: '열람 요청' },
  { key: 'newUser', label: '신규 사용자' },
  { key: 'school', label: '참여 학교' }
];

const TAB_TO_DAILY_KEY: Record<TabKey, keyof typeof mockStatistics.daily> = {
  report: 'reports',
  request: 'viewRequests',
  newUser: 'newUsers',
  school: 'participatingSchools'
};

type TrendChartCardProps = {
  selectedYM: YearMonth;
};

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

export default function TrendChartCard({ selectedYM }: TrendChartCardProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('report');

  const dailyList = useMemo(() => {
    const key = TAB_TO_DAILY_KEY[activeTab];
    const list = mockStatistics.daily[key];

    //선택된 월(yyyy-mm)만 남기기
    const ymPrefix = `${selectedYM.year}-${pad2(selectedYM.month)}`; // "2025-11"
    return list.filter((d) => d.date.startsWith(ymPrefix));
  }, [activeTab, selectedYM.year, selectedYM.month]);

  const labels = useMemo(() => dailyList.map((d) => d.date), [dailyList]);
  const values = useMemo(() => dailyList.map((d) => d.count), [dailyList]);

  const activeLabel = useMemo(() => {
    return TABS.find((t) => t.key === activeTab)?.label ?? '';
  }, [activeTab]);

  return (
    <StatsCardLarge>
      <div className="flex w-full flex-col items-start gap-[1rem]">
        <div className="flex w-full items-center gap-2 overflow-x-auto px-3">
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

        {/* Chart */}
        <div className="relative w-full">
          <div className="mb-2 ml-5 text-[1rem] font-bold text-gray-80">
            일별 변화 추이 (단위: 일)
          </div>
          <div className="w-full overflow-x-auto">
            <div className="mr-30 h-52 min-w-590 px-3">
              <LineChart
                labels={labels}
                values={values}
                datasetLabel={activeLabel}
              />
            </div>
          </div>

          <div className="pointer-events-none absolute top-0 right-0 h-full w-40 bg-linear-to-l from-white to-transparent" />
        </div>
      </div>
    </StatsCardLarge>
  );
}
