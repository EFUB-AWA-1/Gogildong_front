import DropDownIcon from '@/Report/assets/svgs/down.svg?react';

interface SearchDropdownProps {
  label: string;
  options: string[];
  value?: string | null;
  onChange: (value: string) => void;
}

export default function SearchDropdown({
  label,
  options,
  value,
  onChange
}: SearchDropdownProps) {
  return (
    <label className="relative flex w-[264px] items-center rounded-[20px] bg-white py-[9px] pr-20 pl-6 text-heading-lg text-black">
      <span>{value ?? label}</span>
      <DropDownIcon className="pointer-events-none absolute top-1/2 right-6 -translate-y-1/2" />

      {/* //* inset-0으로 부모 전체 영역 절대 위치 덮기, 모두 선택 가능 이벤트 가능하게 */}
      <select
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none text-heading-sm opacity-0 focus:outline-none focus-visible:outline-none"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        <option value="" disabled hidden>
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
