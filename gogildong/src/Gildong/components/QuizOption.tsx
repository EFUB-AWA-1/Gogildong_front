type QuizElement = {
  label: string;
  option: string;
  isSelected: boolean;
  onSelect: () => void;
};

export default function QuizOption({
  label,
  option,
  isSelected,
  onSelect
}: QuizElement) {
  return (
    <div
      onClick={onSelect}
      data-state="dis"
      className={`cursor-pointer inline-flex items-start justify-start gap-2.5 overflow-hidden rounded-xl p-2.5 outline outline-1 outline-offset-[-1px] hover:bg-lime-50 ${isSelected ? 'bg-lime-50 outline-lime-400 rounded-xl shadow-[0px_0px_12px_0px_rgba(170,235,47,0.30)]' : 'bg-white outline-neutral-200'} `}
    >
      <div className="w-60 justify-center text-sm leading-5 font-medium text-zinc-800">
        {label}) {option}
      </div>
    </div>
  );
}
