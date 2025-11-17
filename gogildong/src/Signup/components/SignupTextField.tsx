import type { InputHTMLAttributes } from "react";

interface SignupTextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  hint?: string;
  error?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export default function SignupTextField({
  label,
  hint,
  error = false,
  value,
  onChange,
  onBlur,
  ...rest
}: SignupTextFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className={`pl-4 text-body-xs text-black`}>{label}</span>
      <input
        {...rest}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => onBlur?.()}
        className={`rounded-[1.25rem] border px-6 py-4 text-body-sm text-black placeholder:text-gray-40 focus:outline-none ${
          error
            ? "border-warning-100 focus:ring-0"
            : "border-gray-20 focus:border-transparent focus:ring-1 focus:ring-neon-100"
        }`}
      />
      {hint && (
        <span
          className={`pl-4 text-body-xs ${
            error ? "text-warning-100" : "text-gray-60"
          }`}
        >
          {hint}
        </span>
      )}
    </label>
  );
}
