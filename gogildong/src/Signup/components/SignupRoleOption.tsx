import CheckIcon from '@/Signup/assets/icon_check.svg?react';
interface SignupRoleOptionProps {
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function SignupRoleOption({
  title,
  description,
  selected = false,
  onClick
}: SignupRoleOptionProps) {
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-between gap-8 rounded-20 border bg-white px-8 py-5.5 text-left transition-colors ${selected ? 'border-neon-100 shadow-[0_0_12px_rgba(170,235,47,0.30)]' : 'border-gray-20'}`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <p className="text-body-bold-md text-black">{title}</p>
        <p className="text-body-sm text-gray-60">{description}</p>
      </div>
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-opacity ${selected ? 'border-neon-100 bg-neon-100 opacity-100' : 'border-transparent bg-transparent opacity-0'}`}
      >
        <CheckIcon />
      </div>
    </button>
  );
}
