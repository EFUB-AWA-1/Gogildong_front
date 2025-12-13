import { useEffect, useMemo, useState } from 'react';
import type { YearMonth } from '@/Admin/utils/dateRange';
import { formatYM } from '@/Admin/utils/dateRange';
import Calender from './Calender';

type Props = {
  isOpen: boolean;
  draftYM: YearMonth;
  onChangeDraft: (next: YearMonth) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function PeriodSelectModal({
  isOpen,
  draftYM,
  onChangeDraft,
  onCancel,
  onConfirm
}: Props) {
  const [viewYear, setViewYear] = useState(draftYM.year);

  useEffect(() => {
    setViewYear(draftYM.year);
  }, [draftYM.year]);

  const headerText = useMemo(() => formatYM(draftYM), [draftYM]);

  if (!isOpen) return null;

  const handlePickMonth = (month: number) => {
    onChangeDraft({ year: viewYear, month });
  };

  return (
    <>
      <button
        type="button"
        aria-label="overlay"
        onClick={onCancel} // 바깥 클릭 시 닫기(원하면 onCancel 제거 가능)
        className="fixed inset-0 z-40 bg-black/40"
      />
      <div className="absolute top-full left-0 z-50 mt-2">
        <div className="inline-flex flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-lg">
          {/* 헤더: 선택 연/월 */}
          <div className="flex h-23 w-full items-center justify-center gap-2 self-stretch border-b border-gray-40 bg-white px-[2.44rem] py-6.25">
            <div className="flex w-full flex-col items-start">
              <div className="text-heading-sm text-gray-60">기간 선택</div>
              <div className="text-heading-md text-black">{headerText}</div>
            </div>
          </div>

          {/* 달력 */}
          <div className="flex items-stretch justify-center p-[0.8rem]">
            <Calender
              viewYear={viewYear}
              onPrevYear={() => setViewYear((prev) => prev - 1)}
              onNextYear={() => setViewYear((prev) => prev + 1)}
              selectedYM={draftYM}
              onPickMonth={handlePickMonth}
            />
          </div>

          {/* 버튼영역 */}
          <div className="flex h-20 items-center justify-center gap-2 self-stretch bg-white px-6 py-6.25">
            <div className="flex w-full items-center justify-end gap-5.25">
              <button
                type="button"
                onClick={onCancel}
                className="flex items-center justify-center rounded-2xl border border-gray-20 bg-white px-7 py-2.75"
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
    </>
  );
}
