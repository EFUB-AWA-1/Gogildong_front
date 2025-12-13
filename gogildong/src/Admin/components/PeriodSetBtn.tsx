import { useMemo, useState } from 'react';
import CalenderIcon from '../assets/svgs/icon_calender.svg?react';
import PeriodSelectModal from './PeriodSelectModal';
import type { YearMonth } from '@/Admin/utils/dateRange';
import { formatYM } from '@/Admin/utils/dateRange';

type PeriodSetBtnProps = {
  value: YearMonth;
  onChange?: (ym: YearMonth) => void;
};

export default function PeriodSetBtn({ value, onChange }: PeriodSetBtnProps) {
  const [committed, setCommitted] = useState<YearMonth>(value);
  const [draft, setDraft] = useState<YearMonth>(value);
  const [open, setOpen] = useState(false);

  const label = useMemo(() => formatYM(draft), [draft]);

  const handleOpen = () => {
    setDraft(committed);
    setOpen(true);
  };

  const handleCancel = () => {
    setDraft(committed);
    setOpen(false);
  };

  const handleConfirm = () => {
    setCommitted(draft);
    onChange?.(draft);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <div
        onClick={handleOpen}
        className="flex cursor-pointer items-center justify-center gap-4 rounded-[1.25rem] bg-white px-[1.12rem] py-2"
      >
        <div className="text-heading-md text-black">{label}</div>
        <CalenderIcon className="h-12 w-12" />
      </div>

      <PeriodSelectModal
        isOpen={open}
        draftYM={draft}
        onChangeDraft={(next) => setDraft(next)}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
