import { useState } from 'react';
import DownIcon from '@/Report/assets/svgs/down.svg?react';

type Option = string | { label: string; value: string };

interface FilterDropdownProps {
  label: string;
  options: Option[];
  value?: string | null;
  className?: string;
  onChange: (value: string) => void;
}

const getLabel = (option: Option) =>
  typeof option === 'string' ? option : option.label;
const getValue = (option: Option) =>
  typeof option === 'string' ? option : option.value;

export default function CustomDropdown({
  label,
  options,
  value,
  onChange,
  className
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (opt: Option) => {
    onChange(getValue(opt));
    setOpen(false);
  };

  const selectedLabel = options.find((opt) => getValue(opt) === value) ?? null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-[54px] items-center gap-2 rounded-2xl bg-white px-4 py-2 text-heading-md whitespace-nowrap text-black ${className}`}
      >
        <span>{selectedLabel ? getLabel(selectedLabel) : label}</span>
        <DownIcon />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-20 w-32 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-20">
          <ul className="flex flex-col text-heading-md text-black">
            {options.map((opt) => {
              const optLabel = getLabel(opt);
              const optValue = getValue(opt);
              const isActive = optValue === value;
              return (
                <li key={optValue}>
                  <button
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`flex w-full items-center justify-center px-3 py-2 ${
                      isActive
                        ? 'bg-neon-10 text-neon-100'
                        : 'bg-white text-black hover:bg-gray-10'
                    }`}
                  >
                    {optLabel}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
