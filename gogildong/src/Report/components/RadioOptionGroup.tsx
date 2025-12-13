import CheckedIcon from '@/Report/assets/svgs/checked.svg?react';
import UncheckedIcon from '@/Report/assets/svgs/unchecked.svg?react';

interface RadioOptionGroupProps {
  name: string;
  options: string[];
  label?: string;
  selectedValue?: string;
  onChange?: (value: string) => void;
}

export default function RadioOptionGroup({
  name,
  options,
  label,
  selectedValue,
  onChange
}: RadioOptionGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-body-bold-lg">{label}</p>}
      <div
        className={`${
          name === 'gender' ? 'flex gap-2' : 'flex flex-col gap-1'
        } text-body-md`}
      >
        {options.map((option) => (
          <label
            key={option}
            className="relative flex flex-1 cursor-pointer items-center gap-4 py-2.5"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={selectedValue === option}
              className="peer absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer opacity-0 focus-visible:ring-2"
              onChange={() => onChange?.(option)}
            />
            <UncheckedIcon className="pointer-events-none h-8 w-8 text-gray-400 peer-checked:hidden focus-visible:ring-2 focus-visible:ring-blue-500" />

            <CheckedIcon className="pointer-events-none hidden h-8 w-8 text-neon-100 peer-checked:block" />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
