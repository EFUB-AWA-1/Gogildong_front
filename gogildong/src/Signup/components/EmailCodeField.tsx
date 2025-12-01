interface EmailCodeFieldProps {
  value: string;
  hint?: string;
  error?: boolean;
  onChange: (value: string) => void;
  onVerifyClick: () => void;
  isVerified?: boolean;
  disabled?: boolean;
}

export default function EmailCodeField({
  value,
  hint,
  error,
  onChange,
  onVerifyClick,
  disabled,
  isVerified
}: EmailCodeFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="pl-4 text-body-xs text-black">이메일 확인</span>

      <div className="flex gap-[11px]">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={value}
              placeholder="인증 코드를 입력해주세요."
              onChange={(e) => onChange(e.target.value)}
              className={`w-full rounded-[1.25rem] border px-6 py-4 pr-12 text-body-sm text-black placeholder:text-gray-40 focus:outline-none ${
                error
                  ? "border-warning-100 focus:ring-0"
                  : "border-gray-20 focus:border-transparent focus:ring-1 focus:ring-neon-100"
              }`}
            />
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
        </div>

        <button
          type="button"
          onClick={onVerifyClick}
          disabled={disabled}
          className={`text-body-bold-sm h-14 shrink-0 rounded-[1.25rem] px-4 py-3 ${
            isVerified
              ? "cursor-not-allowed bg-gray-200 text-gray-500"
              : "bg-neon-100 text-black"
          } `}
        >
          {isVerified ? '인증 완료': '코드 확인'}
        </button>
      </div>
    </label>
  );
}
