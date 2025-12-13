import type { FacilityDetail } from '../types/facility';
import type { ReportImage } from '@/FacilityView/types/facilityImage';
import FacilityTitle from './FacilityTitle';
import { useNavigate } from 'react-router-dom';

interface FacilityHeaderProps {
  detail: FacilityDetail;
  isAccessible?: boolean;
  images?: ReportImage[];
  onImageClick?: (index: number) => void;
}

export default function FacilityHeader({
  detail,
  isAccessible,
  images = [],
  onImageClick
}: FacilityHeaderProps) {
  const navigate = useNavigate();
  
const { buildingName, floorName, facilityName, facilityNickName, createdAt, facilityType, facilityId } =
    detail;

  // 개별 이미지 클릭 시: PhotoDetail로 이동 (+ facilityType 전달)
 const handleImageClick = (index: number) => {
    const selectedImage = images[index];
    if (selectedImage) {
      navigate('/school/view/photos/detail', {
        state: {
          photos: images,
          initialReportId: selectedImage.reportId,
          facilityType,
          facilityId
        }
      });
    }
  };

  // 더보기 버튼 클릭 -> PhotoList로 이동 (+ facilityType 전달)
  const handleViewAllClick = () => {
    navigate('/school/view/photos', {
      state: {
        facilityName,
        images,
        facilityType,
        facilityId 
      }
    });
  };

  const MAX_VISIBLE_COUNT = 5;
  const visibleImages = images.slice(0, MAX_VISIBLE_COUNT);
  const chunkSize = 3;
  const groupCount = Math.max(1, Math.ceil((visibleImages.length || 1) / chunkSize));

  const groups = Array.from({ length: groupCount }).map((_, groupIdx) => {
    const start = groupIdx * chunkSize;
    return {
      baseIndex: start,
      items: [visibleImages[start], visibleImages[start + 1], visibleImages[start + 2]]
    };
  });

  const renderSlot = (
    imageItem: ReportImage | undefined,
    slotIdx: number,
    className: string
  ) => {
    const globalIndex = slotIdx;
    const content = imageItem ? (
      <img
        src={imageItem.facilityImage}
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
        onClick={() => imageItem && handleImageClick(globalIndex)}
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
        isAccessible={isAccessible}
      />

      <div className="scrollbar-hide flex w-full flex-nowrap gap-3 overflow-x-auto pb-1">
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

        {images.length > 0 && (
          <button
            type="button"
            onClick={handleViewAllClick}
            className="flex h-[220px] w-[60px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-gray-20 bg-gray-5 text-gray-60 transition active:bg-gray-20"
          >
            <span className="text-xl font-bold">+</span>
            <span className="text-caption-md [writing-mode:vertical-lr]">더보기</span>
          </button>
        )}
      </div>
    </div>
  );
}