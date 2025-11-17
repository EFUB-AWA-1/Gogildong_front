import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import EyeIcon from "@/Signup/assets/icon_eye.svg?react";
import EyeOffIcon from "@/Signup/assets/icon_eye_disabled.svg?react";
import ClearIcon from "@/Signup/assets/close.svg?react";

interface SignupTextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
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
  type = "text",
  ...rest
}: SignupTextFieldProps) {
  const isPasswordField = label === "비밀번호" || label === "비밀번호 확인";
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  const showClearButton = !isPasswordField && value && value.length > 0;

  const handleClear = () => {
    onChange("");
  };

  return (
    <label className="flex flex-col gap-2">
      <span className="pl-4 text-body-xs text-black">{label}</span>

      <div className="relative">
        <input
          {...rest}
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={() => onBlur?.()}
          className={`w-full rounded-[1.25rem] border px-6 py-4 pr-12 text-body-sm text-black placeholder:text-gray-40 focus:outline-none ${
            error
              ? "border-warning-100 focus:ring-0"
              : "border-gray-20 focus:border-transparent focus:ring-1 focus:ring-neon-100"
          }`}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-4 -translate-y-1/2"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}

        {showClearButton && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-1/2 right-6 -translate-y-1/2 text-gray-40 hover:text-gray-60"
          >
            <ClearIcon width={18} height={18} />
          </button>
        )}
      </div>

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
