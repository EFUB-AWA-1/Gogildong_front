import EyeIcon from '@/Signup/assets/icon_eye.svg?react';
import EyeOffIcon from '@/Signup/assets/icon_eye_disabled.svg?react';
import { useState } from 'react';
interface LoginInputFieldProps {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}
export default function LoginInputField({
  label,
  value,
  type = 'text',
  placeholder,
  onChange
}: LoginInputFieldProps) {
  const inputId = label;
  const isPasswordField = label === '비밀번호';
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPasswordField
    ? showPassword
      ? 'text'
      : 'password'
    : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="flex flex-col pb-5">
      <label htmlFor={inputId} className="text-body-sm text-black">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          className="w-full border-b-2 border-gray-300 px-4 py-3 text-body-md focus:border-neon-100 focus:outline-none"
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-4 -translate-y-1/2"
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        )}
      </div>
    </div>
  );
}
