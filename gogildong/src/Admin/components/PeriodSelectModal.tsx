// src/common/components/PeriodSelectModal.tsx
import { useMemo, useState } from 'react';
import type { YearMonth } from '@/Admin/utils/dateRange';
import { compareYM, formatRange } from '@/Admin/utils/dateRange';
import ArrowLeftIcon from '../assets/svgs/icon_year_back.svg?react';
import ArrowRightIcon from '../assets/svgs/icon_year_next.svg?react';

type Props = {
  isOpen: boolean;

  // “즉시 반영”을 위해 draft를 부모(버튼)에서 관리합니다.
  draftStart: YearMonth;
  draftEnd: YearMonth;
  onChangeDraft: (next: { start: YearMonth; end: YearMonth }) => void;

  // Cancel/Confirm
  onCancel: () => void;
  onConfirm: () => void;

  maxMonthsInclusive?: number; // default 12
};

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

function MonthButton({
  label,
  selected,
  disabled,
  onClick
}: {
  label: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={[
        'flex h-12 w-25 shrink-0 items-center justify-center rounded-[1.25rem] px-[1.125rem] py-[0.625rem]',
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

export default function PeriodSelectModal({
  isOpen,
  draftStart,
  draftEnd,
  onChangeDraft,
  onCancel,
  onConfirm,
  maxMonthsInclusive = 12
}: Props) {
  const [startViewYear, setStartViewYear] = useState(draftStart.year);
  const [endViewYear, setEndViewYear] = useState(draftEnd.year);

  // draft가 바뀌면 viewYear가 너무 멀어지지 않게 맞춰줌(선택 즉시 반영 UX)
  useMemo(() => {
    setStartViewYear(draftStart.year);
    setEndViewYear(draftEnd.year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftStart.year, draftEnd.year]);

  const headerText = useMemo(
    () => formatRange(draftStart, draftEnd),
    [draftStart, draftEnd]
  );

  if (!isOpen) return null;

  const handlePickStart = (month: number) => {
    const start = { year: startViewYear, month };

    // start가 end보다 뒤면 end를 start로 맞춤(기존 요구)
    const end = compareYM(start, draftEnd) > 0 ? start : draftEnd;

    onChangeDraft({ start, end });
  };

  const handlePickEnd = (month: number) => {
    const end = { year: endViewYear, month };

    // end가 start보다 앞이면 start를 end로 맞춤(기존 요구)
    const start = compareYM(draftStart, end) > 0 ? end : draftStart;

    onChangeDraft({ start, end });
  };

  const startGrid = (
    <div className="flex w-93 flex-col items-center justify-center gap-2 p-2">
      {/* '시작 월' */}
      <div className="flex flex-col items-center justify-center p-3.5">
        <div className="text-heading-sm text-gray-60">시작 월</div>
      </div>

      {/* 연도 선택 */}
      <div className="flex w-full items-center justify-between px-5">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center"
          onClick={() => setStartViewYear((prev) => prev - 1)}
          aria-label="start year prev"
        >
          <ArrowLeftIcon className="h-11 w-11" />
        </button>

        <div className="w-35 shrink-0 text-center text-heading-md text-black">
          {startViewYear}
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center"
          onClick={() => setStartViewYear((prev) => prev + 1)}
          aria-label="start year next"
        >
          <ArrowRightIcon className="h-11 w-11" />
        </button>
      </div>

      {/* 월 선택 */}
      <div className="flex w-93 flex-col items-center justify-center gap-2 p-2">
        {Array.from({ length: 4 }, (_, row) => (
          <div
            key={row}
            className="flex h-15 w-93 items-center justify-center gap-2 p-2"
          >
            {MONTHS.slice(row * 3, row * 3 + 3).map((m) => {
              const ym = { year: startViewYear, month: m };
              const selected = compareYM(ym, draftStart) === 0;

              // disabled 규칙: ym <= draftEnd 인 경우에만 12개월 초과를 체크
              const monthDiff = Math.abs(compareYM(ym, draftEnd)); // (개월 단위 차이)
              const disabled =
                compareYM(ym, draftEnd) <= 0 &&
                monthDiff > maxMonthsInclusive - 1;

              return (
                <MonthButton
                  key={m}
                  label={`${m}월`}
                  selected={selected}
                  disabled={disabled}
                  onClick={() => handlePickStart(m)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  const endGrid = (
    <div className="flex w-93 flex-col items-center justify-center gap-2 p-2">
      {/* '종료 월' */}
      <div className="flex flex-col items-center justify-center p-3.5">
        <div className="text-heading-sm text-gray-60">종료 월</div>
      </div>

      {/* 연도 선택 */}
      <div className="flex w-full items-center justify-between px-5">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center"
          onClick={() => setEndViewYear((prev) => prev - 1)}
          aria-label="end year prev"
        >
          <ArrowLeftIcon className="h-11 w-11" />
        </button>

        <div className="w-35 shrink-0 text-center text-heading-md text-black">
          {endViewYear}
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center"
          onClick={() => setEndViewYear((prev) => prev + 1)}
          aria-label="end year next"
        >
          <ArrowRightIcon className="h-11 w-11" />
        </button>
      </div>

      {/* 월 선택 */}
      <div className="flex w-93 flex-col items-center justify-center gap-2 p-2">
        {Array.from({ length: 4 }, (_, row) => (
          <div
            key={row}
            className="flex h-15 w-93 items-center justify-center gap-2 p-2"
          >
            {MONTHS.slice(row * 3, row * 3 + 3).map((m) => {
              const ym = { year: endViewYear, month: m };
              const selected = compareYM(ym, draftEnd) === 0;

              // disabled 규칙: ym >= draftStart 인 경우에만 12개월 초과를 체크
              const monthDiff = Math.abs(compareYM(draftStart, ym));
              const disabled =
                compareYM(draftStart, ym) <= 0 &&
                monthDiff > maxMonthsInclusive - 1;

              return (
                <MonthButton
                  key={m}
                  label={`${m}월`}
                  selected={selected}
                  disabled={disabled}
                  onClick={() => handlePickEnd(m)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="flex w-200 flex-col items-center justify-center overflow-hidden rounded-[1.25rem] bg-white shadow-lg">
        {/* 헤더 */}
        <div className="flex h-23 w-full items-center justify-center gap-2 self-stretch border-b border-gray-40 bg-white px-6 py-[1.5625rem]">
          <div className="flex w-181 flex-col items-start">
            <div className="w-full text-heading-sm text-gray-60">기간 선택</div>
            <div className="w-full text-heading-md text-black">
              {headerText}
            </div>
          </div>
        </div>

        {/* 본문 */}
        <div className="flex w-full items-stretch justify-center">
          {startGrid}

          <div className="w-px bg-gray-20" />

          {endGrid}
        </div>

        {/* 하단 */}
        <div className="flex h-20 w-full items-center justify-center gap-2 self-stretch bg-white px-6 py-[1.5625rem]">
          <div className="flex w-181 items-center justify-end gap-5.25">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center justify-center rounded-2xl border border-gray-20 bg-white px-7 py-[0.6875rem]"
            >
              <span className="text-body-bold-lg text-black">취소</span>
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="flex items-center justify-center rounded-2xl bg-neon-100 px-7 py-[0.625rem]"
            >
              <span className="text-body-bold-lg text-black">선택</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
