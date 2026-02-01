export type TabType = 'report' | 'review';

type TapSelectorProps = {
  value: TabType;
  onChange: (value: TabType) => void;
};

export default function TapSelector({ value, onChange }: TapSelectorProps) {
  return (
    <div className="mt-[1.03rem] flex h-10.25 w-full items-center justify-center gap-5 bg-white px-4">
      <button
        type="button"
        onClick={() => onChange('report')}
        className={`flex h-10 w-37 shrink-0 items-center justify-center text-[1rem] leading-150 font-bold ${
          value === 'report'
            ? 'border-b-2 border-black text-black'
            : 'text-gray-40'
        }`}
      >
        제보
      </button>

      <button
        type="button"
        onClick={() => onChange('review')}
        className={`flex h-10 w-37 shrink-0 items-center justify-center text-[1rem] leading-150 font-bold ${
          value === 'review'
            ? 'border-b-2 border-black text-black'
            : 'text-gray-40'
        }`}
      >
        리뷰
      </button>
    </div>
  );
}
