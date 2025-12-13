type RankingBoxProps = {
  ranking: number;
  nickname: string;
  point: number;
};

export default function RankingBox({
  ranking,
  nickname,
  point
}: RankingBoxProps) {
  // 랭킹에 따라 배경색 결정
  let bgClass = '';
  switch (ranking) {
    case 1:
      bgClass = 'bg-[#CCF382]';
      break;
    case 2:
      bgClass = 'bg-lime-200';
      break;
    case 3:
      bgClass = 'bg-lime-50';
      break;
    default:
      bgClass = 'bg-white';
  }

  return (
    <div
      className={`flex w-full items-center justify-between rounded-[20px] px-6 py-2 shadow-[0px_0px_12px_0px_rgba(170,235,47,0.30)] outline outline-1 outline-offset-[-1px] outline-lime-400 ${bgClass}`}
    >
      {/* 랭킹 */}
      <div className="flex w-7 items-center justify-start">
        <div className="text-base leading-6 font-medium text-zinc-800">
          {ranking}등
        </div>
      </div>

      {/* 닉네임 */}
      <div className="flex w-46 items-center justify-start">
        {nickname}
      </div>

      {/* 포인트 */}
      <div className="flex h-9 w-16 items-center justify-end">
        {point} p
      </div>
    </div>
  );
}
