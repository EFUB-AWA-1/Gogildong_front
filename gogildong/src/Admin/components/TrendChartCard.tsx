import StatsCardLarge from '@/Admin/components/StatsCardLarge';

export default function TrendChartCard() {
  return (
    <StatsCardLarge>
      <div className="flex w-full flex-col items-start gap-[1.31rem]">
        <div className="self-stretch text-display-md font-bold text-black">
          장소별 제보 · 요청 통계
        </div>
        <div>chart</div>
      </div>
    </StatsCardLarge>
  );
}
