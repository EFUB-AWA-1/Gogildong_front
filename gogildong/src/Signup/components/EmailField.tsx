interface EmailFieldProps {
  value: string;
  hint?: string;
  error?: boolean;
  onChange: (value: string) => void;
  onRequestClick: () => void;
  requested: boolean;
}

export default function EmailField({
  value,
  hint,
  error,
  onChange,
  onRequestClick,
  requested
}: EmailFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="pl-4 text-body-xs text-black">이메일</span>

      <div className="flex gap-[11px]">
        <div className="flex-1">
          <div className="relative">
            <input
              type="email"
              value={value}
              placeholder="예) 123456@domain.com"
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
          onClick={onRequestClick}
          className={`text-body-bold-sm h-14 shrink-0 cursor-pointer rounded-[1.25rem] px-4 py-3 ${
            requested ? "bg-gray-20 text-gray-60" : "bg-neon-100 text-black"
          }`}
        >
          {requested ? "재요청" : "인증 요청"}
        </button>
      </div>
    </label>
  );
}
