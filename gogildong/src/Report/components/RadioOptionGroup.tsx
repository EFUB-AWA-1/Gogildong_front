interface RadioOptionGroupProps {
  name: string;
  options: string[];
  label?: string;
  onChange?: (value: string) => void;
}

export default function RadioOptionGroup({
  name,
  options,
  label,
  onChange
}: RadioOptionGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-body-bold-lg">{label}</p>}
      <div
        className={`${
          options.length <= 2 ? "flex gap-2" : "flex flex-col gap-1"
        } text-body-md`}
      >
        {options.map((option) => (
          <label
            key={option}
            className="flex flex-1 cursor-pointer items-center gap-4"
          >
            <input
              type="radio"
              name={name}
              value={option}
              className="h-5 w-5 accent-neon-100"
              onChange={() => onChange?.(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
