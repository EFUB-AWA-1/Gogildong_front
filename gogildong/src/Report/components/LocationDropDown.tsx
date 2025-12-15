import { useState } from 'react';
import DownIcon from '@/Report/assets/svgs/down.svg?react';

interface LocationDropDownProps {
  label?: string; // 선택 전에 표시할 레이블링
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function LocationDropDown({
  label,
  options,
  value,
  onChange,
  disabled = true
}: LocationDropDownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full">
      <button
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`z-50 flex w-full flex-1 items-center justify-between rounded-20 border border-gray-40 py-[18px] pr-[13px] pl-4 whitespace-nowrap transition ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'} `}
      >
        <span>{value || label}</span>
        <DownIcon />
      </button>
      {open && (
        <ul className="border-gray-30 animate-fadeIn absolute top-[calc(100%+4px)] left-0 z-10 w-full overflow-hidden rounded-2xl border bg-white shadow-lg">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="px-4 py-3"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
