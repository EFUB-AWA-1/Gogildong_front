import type { FacilityInfo } from '../types/facility';

interface InfoCardProps {
  data: FacilityInfo;
}

export default function InfoCard({ data }: InfoCardProps) {
  const { gender, isAccessible, doorType } = data;

  const genderText = gender === 'female' ? '여자 화장실' : '남자 화장실';
  const genderEmoji = gender === 'female' ? '🚺' : '🚹';

  const accessibilityText = isAccessible ? '장애인 칸 있음' : '일반 화장실';
  const accessibilityEmoji = isAccessible ? '🟢' : '⚪️';

  const doorTypeMap: Record<string, string> = {
    hinged: '여닫이문',
    sliding: '미닫이문',
    automatic: '자동문'
  };

  const doorText = doorTypeMap[doorType] || '기타';

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-gray-20 bg-white p-5 shadow-sm">
      <p className="text-body-bold-lg text-black">화장실 정보</p>

      <div className="flex flex-wrap justify-between text-body-md text-black">
        <div className="flex items-center gap-2">
          <span className="text-xl">{genderEmoji}</span>
          <span>{genderText}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl">{accessibilityEmoji}</span>
          <span>{accessibilityText}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-body-md">
        <span className="text-xl">🚪</span>
        <span>{doorText}</span>
      </div>
    </div>
  );
}
