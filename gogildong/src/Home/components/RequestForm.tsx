import { useState } from "react";

interface FormFieldProps {
  label: string;
  placeholder?: string;
  type?: "text" | "textarea";
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function RequestForm({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const effectivePlaceholder = isFocused ? "" : placeholder;

  const baseStyle = `
    w-full border border-[#E4E4E4] rounded-2xl outline-none bg-white 
    placeholder:text-[#9E9E9E] font-[Pretendard Variable]
  `;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="flex flex-col gap-3">
      <label className="self-stretch text-black text-base font-bold leading-6">
        {label}
        <span className="text-[#FF1010]"> *</span>
      </label>

      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={effectivePlaceholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${baseStyle} h-46.75 px-6 py-4.75 resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={effectivePlaceholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${baseStyle} h-13.5 px-6 py-4.25`}
        />
      )}
    </div>
  );
}
