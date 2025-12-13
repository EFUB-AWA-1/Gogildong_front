import type { YearMonth } from '@/Admin/utils/dateRange';
import { compareYM } from '@/Admin/utils/dateRange';
import ArrowLeftIcon from '@/Admin/assets/svgs/icon_year_back.svg?react';
import ArrowRightIcon from '@/Admin/assets/svgs/icon_year_next.svg?react';

type MonthButtonProps = {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
};

function MonthButton({
  label,
  selected,
  disabled = false,
  onClick
}: MonthButtonProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={[
        'flex h-12 w-25 shrink-0 items-center justify-center rounded-20 px-4.5 py-2.5',
        'transition-colors',
        selected
          ? 'border border-neon-100 bg-neon-15'
          : 'border border-transparent',
        disabled ? 'cursor-not-allowed' : 'hover:border hover:border-gray-20'
      ].join(' ')}
    >
      <span
        className={[
          'text-heading-sm',
          disabled ? 'text-gray-40' : 'text-black'
        ].join(' ')}
      >
        {label}
      </span>
    </button>
  );
}

type Props = {
  viewYear: number;
  onPrevYear: () => void;
  onNextYear: () => void;
  selectedYM: YearMonth; // 현재 선택된 (year, month)
  onPickMonth: (month: number) => void;
};

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function Calender({
  viewYear,
  onPrevYear,
  onNextYear,
  selectedYM,
  onPickMonth
}: Props) {
  return (
    <div className="flex w-93 flex-col items-center justify-center gap-2">
      {/* 연도 선택 */}
      <div className="flex w-full items-center justify-between">
        <ArrowLeftIcon className="h-11 w-11" onClick={onPrevYear} />
        <div className="shrink-0 text-center text-heading-md text-black">
          {viewYear}
        </div>
        <ArrowRightIcon className="h-11 w-11" onClick={onNextYear} />
      </div>

      {/* 월 선택 */}
      <div className="flex w-full flex-col items-center justify-center gap-2 p-2">
        {Array.from({ length: 4 }, (_, row) => (
          <div
            key={row}
            className="flex h-15 w-93 items-center justify-center gap-2 p-2"
          >
            {MONTHS.slice(row * 3, row * 3 + 3).map((m) => {
              const ym = { year: viewYear, month: m };
              const selected = compareYM(ym, selectedYM) === 0;

              return (
                <MonthButton
                  key={m}
                  label={`${m}월`}
                  selected={selected}
                  onClick={() => onPickMonth(m)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
