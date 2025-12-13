import AccessbilityIcon from '@/FacilityView/assets/svgs/icon_disabled.svg?react';

interface FacilityTitleProps {
  buildingName: string;
  floorName: string;
  facilityName: string;
  facilityNickName?: string;
  createdAt?: string;
  isAccessible?: boolean; // Prop 추가
}

export default function FacilityTitle({
  buildingName,
  floorName,
  facilityName,
  facilityNickName,
  createdAt,
  isAccessible // 추가
}: FacilityTitleProps) {
  const formattedDate = createdAt
    ? new Date(createdAt).toISOString().split('T')[0]
    : null;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-body-md text-gray-80">
        {buildingName} {floorName}층 | {facilityNickName ?? facilityName}
        {formattedDate ? ` (${formattedDate} 기준)` : ''}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-display-md text-black">{facilityName}</p>
        
        {/* isAccessible이 true일 때만 아이콘 렌더링 */}
        {isAccessible && <AccessbilityIcon />}
      </div>
    </div>
  );
}