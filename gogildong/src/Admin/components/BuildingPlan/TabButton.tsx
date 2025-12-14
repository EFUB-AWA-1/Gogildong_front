import KebabIcon from '@/Admin/assets/svgs/icon_kebab.svg?react';

type Props = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export default function TabButton({ label, active, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-13.5 shrink-0 items-center justify-center gap-2 rounded-2xl border border-transparent px-5 py-1.5 ${
        active ? 'bg-[#AAEB2F]' : 'bg-transparent hover:border-gray-40'
      }`}
    >
      <span className="text-heading-lg text-black">{label}</span>

      <KebabIcon className="h-8.5 w-8.5" />
    </button>
  );
}
