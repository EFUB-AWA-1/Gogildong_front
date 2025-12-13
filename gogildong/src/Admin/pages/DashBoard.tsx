import DesktopHeader from '@/Admin/components/DesktopHeader';
import DownloadBtn from '@/Admin/components/DownloadBtn';
import PeriodSetBtn from '@/Admin/components/PeriodSetBtn';
import PlaceChartCard from '@/Admin/components/PlaceChartCard';
import StatsCardSmall from '@/Admin/components/StatsCardSmall';
import TrendChartCard from '@/Admin/components/TrendChartCard';
import type { YearMonth } from '@/Admin/utils/dateRange';
import { useState } from 'react';

export default function DashBoard() {
  const [selectedYM, setSelectedYM] = useState<YearMonth>({
    year: 2025,
    month: 11
  });

  return (
    <>
      <DesktopHeader title="대시보드" />
      <div className="mb-6 flex w-full items-center justify-between">
        <PeriodSetBtn value={selectedYM} onChange={setSelectedYM} />
        <DownloadBtn />
      </div>
      <div className="flex flex-col gap-5">
        <div className="grid w-full grid-cols-3 gap-5">
          <StatsCardSmall title="제보" current={7268} diff={8} rate="-2.1%" />
          <StatsCardSmall
            title="신규 사용자"
            current={1008}
            diff={987}
            rate="1.1%"
          />
          <StatsCardSmall title="참여 학교" current={7268} diff={0} rate="0%" />
        </div>
        <div className="grid w-full grid-cols-2 gap-5">
          <PlaceChartCard selectedYM={selectedYM} />
          <TrendChartCard selectedYM={selectedYM} />
        </div>
      </div>
    </>
  );
}
