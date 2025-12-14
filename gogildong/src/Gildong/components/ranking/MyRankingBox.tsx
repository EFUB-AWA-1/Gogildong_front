import ProgressBar from '@/Gildong/components/ranking/ProgressBar';

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
  const SCHOOL_KEYWORDS = ['학교', '중학교', '고등학교', '대학교'];
  const isSchoolName =
    nickname && SCHOOL_KEYWORDS.some((word: string) => nickname.includes(word));
  return (
    <div className="flex flex-col gap-2 rounded-3xl bg-white px-6 py-5 shadow-[0px_0px_12px_0px_rgba(170,235,47,0.30)] outline outline-1 outline-offset-[-1px] outline-lime-400">
      <div className="text-lg font-bold text-zinc-800">나의 순위는?</div>
      <div className="flex flex-row gap-10">
        <div className="w-8">
          <span className="font-medium text-lime-400">
            {myRanking?.toLocaleString?.() ?? '-'}
          </span>
          <span className="font-medium text-zinc-800">등</span>
        </div>
        <div className="font-medium text-zinc-800 break-words whitespace-normal">{nickname} {!isSchoolName && '님'}</div>
      </div>

      <div className="flex w-full flex-row items-center gap-2">
        {/* 그래프*/}
        <ProgressBar percent={globalPercent} />
        <div className="font-sm font-medium">
          <span>상위 </span>
          <span className="text-lime-400">
            {globalPercent?.toFixed?.() ?? '-'}
          </span>
          <span>%</span>
        </div>
      </div>
    </div>
  );
}
