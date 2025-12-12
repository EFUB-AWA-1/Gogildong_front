import DropDownIcon from '@/Report/assets/svgs/down.svg?react';
import { useState } from 'react';
interface SearchDropdownProps {
  label: string;
  options: string[];
  value?: string[];
  onChange: (value: string) => void;
}

export default function SearchDropdown({
  label,
  options,
  value,
  onChange
}: SearchDropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative bg-white text-black">
      <button
        className="flex items-center justify-between"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{label}</span>
        <DropDownIcon />
      </button>

      {open && (
        <ul>
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
