import { type FormEvent, useState } from "react";
import ArrowUpIcon from "../../assets/icon_arrow_up.svg?react";

type CommentInputProps = {
  onSubmit?: (value: string) => void;
};

export default function CommentInput({ onSubmit }: CommentInputProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const isDisabled = value.trim().length === 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    if (onSubmit) {
      onSubmit(trimmed);
    }
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center justify-between bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.2)_100%)] px-4.75 py-6 backdrop-blur-[2.5px]"
    >
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? "" : "댓글을 남겨주세요."}
        className="mr-3 h-10 flex-1 rounded-3xl border border-[#E4E4E4] bg-[#F5F5F5] px-4 py-2 text-body-sm text-black outline-none placeholder:text-body-sm placeholder:text-gray-400"
      />
      <button
        type="submit"
        disabled={isDisabled}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neon-100 disabled:cursor-not-allowed disabled:bg-gray-20"
      >
        <ArrowUpIcon className="h-4 w-4" />
      </button>
    </form>
  );
}
