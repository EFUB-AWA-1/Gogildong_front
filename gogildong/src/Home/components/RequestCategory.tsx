import { useState } from 'react';
import DropdownIcon from '../assets/icon_dropdown.svg?react';
import DropdownOpenIcon from '../assets/icon_dropdown_open.svg?react';

const PURPOSE_OPTIONS = [
  '개인 조사/학습 목적',
  '진학(입학) 관련',
  '교사/연구 목적',
  '학부모 문의',
  '행정/공문',
  '기타'
];

type PurposeSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function RequestCategory({
  value,
  onChange
}: PurposeSelectProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  const hasValue = !!value;

  return (
    <div className="relative">
      {/* 상단 선택 박스 */}
      <button
        type="button"
        onClick={handleToggle}
        className="flex h-15 w-full items-center justify-between rounded-[1.25rem] border border-[#E4E4E4] bg-white px-4"
      >
        <span
          className={`text-body-md ${hasValue ? 'text-black' : 'text-gray-40'}`}
        >
          {hasValue ? value : '선택'}
        </span>
        <span className="flex h-6 w-6 items-center justify-center">
          {open ? <DropdownOpenIcon /> : <DropdownIcon />}
        </span>
      </button>

      {/* 드롭다운 리스트 */}
      {open && (
        <div className="absolute z-20 mt-2 flex w-full flex-col items-center rounded-[1.25rem] border border-[#E4E4E4] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.10)]">
          {PURPOSE_OPTIONS.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`flex w-full items-center gap-2 px-6 py-5 text-left text-body-md text-[#282828] hover:bg-gray-10 ${
                option === value ? 'bg-neon-15' : ''
              } ${
                index !== PURPOSE_OPTIONS.length - 1
                  ? 'border-b border-[#E4E4E4]'
                  : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
