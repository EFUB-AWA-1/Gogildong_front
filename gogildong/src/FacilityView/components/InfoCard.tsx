import type { FacilityInfo } from '../types/facility';

interface InfoCardProps {
  data: FacilityInfo;
}

export default function InfoCard({ data }: InfoCardProps) {
  const { gender, accessible, doorType, doorWidth } = data;

  // 성별 처리
  const isFemale = gender && gender.toUpperCase() === 'FEMALE';
  const genderText = isFemale ? '여자 화장실' : '남자 화장실';
  const genderEmoji = isFemale ? '🚺' : '🚹';

  // 접근성 처리
  const accessibilityText = accessible ? '장애인 칸 있음' : '일반 화장실';
  const accessibilityEmoji = accessible ? '🟢' : '⚪️';

  // 문 타입 매핑
  const doorTypeMap: Record<string, string> = {
    SLIDING: '미닫이문',
    HINGED: '여닫이문',
    AUTO: '자동문',
    sliding: '미닫이문',
    hinged: '여닫이문',
    auto: '자동문',
    automatic: '자동문'
  };

  const normalizedDoorType = doorType ? doorType.toUpperCase() : '';
  const doorText = doorTypeMap[normalizedDoorType] || '기타';

  const doorWidthText = doorWidth ? `${doorWidth}cm` : '정보 없음';

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-gray-20 bg-white p-5 shadow-sm">
      <p className="text-body-bold-lg text-black">화장실 정보</p>

      {/*
        (스타일 변경)
        기존의 flex justify-between 2개를 지우고, 
        grid grid-cols-2 하나로 통합했습니다.
        이제 왼쪽/오른쪽 열이 반반으로 나뉘며 내부 텍스트는 왼쪽 정렬됩니다.
      */}
      <div className="grid grid-cols-2 gap-y-3 text-body-md text-black">
        
        {/* 1. 왼쪽 위: 성별 */}
        <div className="flex items-center gap-2">
          <span className="text-xl">{genderEmoji}</span>
          <span>{genderText}</span>
        </div>

        {/* 2. 오른쪽 위: 접근성 */}
        <div className="flex items-center gap-2">
          <span className="text-xl">{accessibilityEmoji}</span>
          <span>{accessibilityText}</span>
        </div>

        {/* 3. 왼쪽 아래: 문 타입 */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🚪</span>
          <span className="text-black">{doorText}</span>
        </div>

        {/* 4. 오른쪽 아래: 문 너비  */}
        <div className="flex items-center gap-2">
          <span className="text-xl">📏</span>
          <span>입구 폭 {doorWidthText}</span>
        </div>

      </div>
    </div>
  );
}