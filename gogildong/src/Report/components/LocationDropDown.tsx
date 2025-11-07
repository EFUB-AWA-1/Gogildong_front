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
  disabled = true,
}: LocationDropDownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className='relative '>
      <button
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`flex justify-between items-center border border-gray-40 rounded-[1.25rem] py-[18px] pl-[37px] pr-[13px] transition
          ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        `}>
        <span>{value || label}</span>
        <DownIcon />
      </button>
      {open && (
        <ul className='absolute z-10 top-14 w-full border-x border-gray-20 rounded-b-xl shadow-md'>
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className='px-4 py-3 '>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
