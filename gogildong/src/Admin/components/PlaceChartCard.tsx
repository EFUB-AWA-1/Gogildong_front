import StackedBarChart from '@/Admin/components/chart/StackedBarChart';
import StatsCardLarge from '@/Admin/components/StatsCardLarge';
import { mockStatistics } from '@/Admin/mocks/mockStatistics';
import type { YearMonth } from '@/Admin/utils/dateRange';

type PlaceChartCardProps = {
  selectedYM: YearMonth;
};

export default function PlaceChartCard({ selectedYM }: PlaceChartCardProps) {
  return (
    <StatsCardLarge>
      <div className="flex w-full flex-col items-start gap-[1.31rem]">
        <div className="self-stretch text-display-md font-bold text-black">
          장소별 제보 · 요청 통계
        </div>
        <div className="relative w-full">
          <div className="mr-30 w-full px-3">
            <StackedBarChart
              monthly={[
                {
                  year: mockStatistics.year,
                  month: mockStatistics.month,
                  placeSummary: mockStatistics.placeSummary
                }
              ]}
              selectedMonth={selectedYM}
            />
          </div>
        </div>
      </div>
    </StatsCardLarge>
  );
}
