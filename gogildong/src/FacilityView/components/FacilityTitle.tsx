import AccessbilityIcon from '@/FacilityView/assets/svgs/icon_disabled.svg?react';
interface FacilityTitleProps {
  buildingName: string;
  floorName: string;
  facilityName: string;
  facilityNickName?: string;
  createdAt?: string;
}

export default function FacilityTitle({
  buildingName,
  floorName,
  facilityName,
  facilityNickName,
  createdAt
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
        <AccessbilityIcon />
      </div>
    </div>
  );
}
