import ProgressBar from "@/Gildong/components/ProgressBar";

type MyRankingProps = {
  myRanking: number;
  nickname: string | undefined;
  globalPercent: number;
};

export default function MyRankingBox({
  myRanking,
  nickname,
  globalPercent
}: MyRankingProps) {
  return (
    <div className="flex flex-col gap-2 rounded-3xl bg-white px-6 py-5 shadow-[0px_0px_12px_0px_rgba(170,235,47,0.30)] outline outline-1 outline-offset-[-1px] outline-lime-400">
      <div className="text-lg font-bold text-zinc-800">나의 순위는?</div>
      <div className="flex flex-row gap-10">
        <div>
          <span className="text-lime-400 font-medium">{myRanking.toLocaleString()}</span>
          <span className="text-zinc-800 font-medium">등</span>
        </div>
        <div className="text-zinc-800 font-medium">{nickname} 님</div>
      </div>

      <div className="flex flex-row items-center w-full gap-2">
        {/* 그래프*/}
        <ProgressBar percent={globalPercent} />
        <div className="font-sm font-medium">
          <span>상위 </span>
          <span className="text-lime-400">{globalPercent.toFixed()}</span>
          <span>%</span>
        </div>
      </div>
    </div>
  );
}
