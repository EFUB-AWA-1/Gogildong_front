import type { FacilityType } from '@/Report/types/facilityTypes';

interface Step0Props {
  selectedType: FacilityType | null;
  onSelect: (type: FacilityType) => void;
}

export default function Step0({ selectedType, onSelect }: Step0Props) {
  const types: FacilityType[] = ['화장실', '엘리베이터', '교실', '기타'];
  return (
    <div className="flex w-full flex-col items-center gap-11 px-4">
      <p className="text-heading-md">어떤 것을 제보할까요?</p>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-3">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => onSelect(t)}
            className={`flex h-[171px] w-full items-center justify-center rounded-3xl border-2 bg-white text-[18px] font-bold text-black transition ${selectedType === t ? 'shadow-neon border-neon-100' : 'border-gray-20'}`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
