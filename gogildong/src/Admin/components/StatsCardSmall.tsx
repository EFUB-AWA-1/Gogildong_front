import DecreaseIcon from '@/Admin/assets/svgs/icon_down.svg?react';
import IncreaseIcon from '@/Admin/assets/svgs/icon_up.svg?react';
import FlatIcon from '@/Admin/assets/svgs/icon_flat.svg?react';
type StatsCardSmallProps = {
  title: string;
  current: number;
  diff: number;
  rate: string;
};

export default function StatsCardSmall({
  title,
  current,
  diff,
  rate
}: StatsCardSmallProps) {
  const rateNumber = parseFloat(rate);

  let diffMeta: {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    bgClass: string;
    textClass: string;
  };

  if (rateNumber > 0) {
    diffMeta = {
      Icon: IncreaseIcon,
      bgClass: 'bg-neon-15',
      textClass: 'text-neon-d'
    };
  } else if (rateNumber < 0) {
    diffMeta = {
      Icon: DecreaseIcon,
      bgClass: 'bg-warning-30',
      textClass: 'text-warning-100'
    };
  } else {
    diffMeta = {
      Icon: FlatIcon,
      bgClass: 'bg-gray-20',
      textClass: 'text-gray-80'
    };
  }

  return (
    <div className="flex shrink-0 items-center justify-center gap-2 rounded-[1.25rem] bg-white p-8 shadow-[0_0_12px_0_rgba(170,235,47,0.3)]">
      <div className="flex w-full flex-col items-start gap-12">
        {/* 제목 */}
        <div className="self-stretch text-display-md font-bold text-black">
          {title}
        </div>

        {/* 총 수치 + 증감 */}
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="self-stretch text-[3rem] leading-150 font-bold text-black">
            {current}
          </div>

          {/*증감*/}
          <div className="flex items-center justify-center pr-4">
            <div
              className={`flex items-center rounded-full px-4 ${diffMeta.bgClass} ${diffMeta.textClass}`}
            >
              <diffMeta.Icon className="h-12 w-12" />

              <span className="text-display-sm">
                {diff} ({rate}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
