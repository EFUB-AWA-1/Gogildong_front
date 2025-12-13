import type { FacilityDetail } from '../types/facility';
import FacilityTitle from './FacilityTitle';

interface FacilityHeaderProps {
  detail: FacilityDetail;
  isAccessible?: boolean; // Prop 추가
  images?: string[];
  onImageClick?: (index: number) => void;
}

export default function FacilityHeader({
  detail,
  isAccessible, // 추가
  images = [],
  onImageClick
}: FacilityHeaderProps) {
  const { buildingName, floorName, facilityName, facilityNickName, createdAt } =
    detail;

  const handleImageClick = (index: number) => {
    if (onImageClick) {
      onImageClick(index);
    }
  };

  const chunkSize = 3;
  const groupCount = Math.max(1, Math.ceil((images.length || 1) / chunkSize));
  const groups = Array.from({ length: groupCount }).map((_, groupIdx) => {
    const start = groupIdx * chunkSize;
    return {
      baseIndex: start,
      items: [images[start], images[start + 1], images[start + 2]]
    };
  });

  const renderSlot = (
    imageSrc: string | undefined,
    slotIdx: number,
    className: string
  ) => {
    const globalIndex = slotIdx;
    const content = imageSrc ? (
      <img
        src={imageSrc}
        alt={`${facilityName} 이미지 ${globalIndex + 1}`}
        className="h-full w-full object-cover"
      />
    ) : (
      <div className="h-full w-full bg-gray-20" />
    );

    return (
      <button
        key={globalIndex}
        type="button"
        className={`overflow-hidden rounded-xl ${className}`}
        onClick={() => imageSrc && handleImageClick(globalIndex)}
        aria-label="시설 이미지"
      >
        {content}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <FacilityTitle
        buildingName={buildingName}
        floorName={floorName}
        facilityName={facilityName}
        facilityNickName={facilityNickName}
        createdAt={createdAt}
        isAccessible={isAccessible} // 추가
      />

      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
        {groups.map(({ items, baseIndex }, patternIdx) => {
          const [main, sub1, sub2] = items;
          return (
            <div
              key={patternIdx}
              className="flex h-[220px] w-[300px] shrink-0 gap-2"
            >
              <div className="h-full w-[180px]">
                {renderSlot(main, baseIndex, 'h-full w-full')}
              </div>
              <div className="flex h-full w-[110px] flex-col gap-2">
                {renderSlot(sub1, baseIndex + 1, 'h-1/2 w-full')}
                {renderSlot(sub2, baseIndex + 2, 'h-1/2 w-full')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
