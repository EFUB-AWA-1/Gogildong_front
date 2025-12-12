import StatsCardLarge from '@/Admin/components/StatsCardLarge';

export default function PlaceChartCard() {
  return (
    <StatsCardLarge>
      <div className="flex w-full flex-col items-start gap-[1.31rem]">
        <div className="self-stretch text-display-md font-bold text-black">
          장소별 제보 · 요청 통계
        </div>
        <div>bar chart</div>
      </div>
    </StatsCardLarge>
  );
}
