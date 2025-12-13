// src/common/components/PeriodSetBtn.tsx
import { useMemo, useState } from 'react';
import CalenderIcon from '../assets/svgs/icon_calender.svg?react';
import PeriodSelectModal from './PeriodSelectModal';
import type { YearMonth } from '@/Admin/utils/dateRange';
import { formatRange, clampRangeToMaxMonths } from '@/Admin/utils/dateRange';

type Props = {
  initialStart?: YearMonth;
  initialEnd?: YearMonth;

  // 확정(선택 버튼 눌렀을 때)된 값 외부로 전달
  onChange?: (range: { start: YearMonth; end: YearMonth }) => void;

  maxMonthsInclusive?: number; // default 12
};

export default function PeriodSetBtn({
  initialStart = { year: 2025, month: 10 },
  initialEnd = { year: 2025, month: 11 },
  onChange,
  maxMonthsInclusive = 12
}: Props) {
  // 확정된 값(필터 적용 기준)
  const [committed, setCommitted] = useState(() =>
    clampRangeToMaxMonths(initialStart, initialEnd, maxMonthsInclusive)
  );

  // 드래프트 값(모달에서 클릭 즉시 반영)
  const [draft, setDraft] = useState(committed);
  const [open, setOpen] = useState(false);

  const label = useMemo(
    () => formatRange(draft.start, draft.end),
    [draft.start, draft.end]
  );

  const handleOpen = () => {
    setDraft(committed);
    setOpen(true);
  };

  const handleCancel = () => {
    // 취소 시 draft를 committed로 되돌리고 닫기
    setDraft(committed);
    setOpen(false);
  };

  const handleConfirm = () => {
    setCommitted(draft);
    onChange?.(draft);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="flex cursor-pointer items-center justify-center gap-4 rounded-[1.25rem] bg-white px-[1.12rem] py-2"
      >
        {/* 모달에서 월 클릭 즉시 draft가 바뀌므로 버튼도 즉시 바뀜 */}
        <div className="text-heading-md text-black">{label}</div>
        <CalenderIcon className="h-12 w-12" />
      </button>

      <PeriodSelectModal
        isOpen={open}
        draftStart={draft.start}
        draftEnd={draft.end}
        onChangeDraft={(next) => setDraft(next)}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        maxMonthsInclusive={maxMonthsInclusive}
      />
    </>
  );
}
