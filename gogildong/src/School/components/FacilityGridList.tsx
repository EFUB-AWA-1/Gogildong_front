import FacilityCard from "./FacilityCard";
import type { FacilityItem } from "@/School/api/schoolDetailApi";

interface FacilityGridListProps {
  facilities: FacilityItem[];
}

export default function FacilityGridList({ facilities }: FacilityGridListProps) {
  
  const safeFacilities = Array.isArray(facilities) ? facilities : [];

  if (safeFacilities.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center w-full py-20">
            <p className="text-gray-500 text-body-sm">시설 정보가 없습니다.</p>
        </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {safeFacilities.map((item) => (
        <FacilityCard
          key={item.facilityId}
          facilityId={item.facilityId}
          title={item.facilityName}
          date={new Date(item.updateAt).toLocaleDateString()} 
          location={item.facilityNickname}
          isDisability={item.accessible} 
        />
      ))}
    </div>
  );
}