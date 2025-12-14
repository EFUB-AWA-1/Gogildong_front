import { useEffect, useState } from 'react';
import ActionButton from '@/common/components/ActionButton';
import type { LocationData } from '../types/report';
import LocationSelectorGroup from './LocationSelectorGroup';
import { getFloorPlan } from '@/Report/api/getFacilities';
import type { FacilityTypeParam } from '@/Report/types/facilityTypes';

interface ReportForm1Props {
  locationData: LocationData;
  schoolId?: number;
  floorId?: number;
  facilityTypeParam?: FacilityTypeParam;
  onChange: (data: LocationData) => void;
  onFloorSelect?: (floorId: number | null) => void;
  onNext: () => void;
}

export default function ReportForm1({
  locationData,
  schoolId,
  floorId,
  facilityTypeParam,
  onChange,
  onFloorSelect,
  onNext
}: ReportForm1Props) {
  const [planUrl, setPlanUrl] = useState<string | null>(null);

  const isComplete =
    locationData.building && locationData.floor && locationData.facility;

  useEffect(() => {
    let ignore = false;

    const fetchFloorPlan = async () => {
      if (!schoolId || !floorId) {
        setPlanUrl(null);
        return;
      }
      try {
        const data = await getFloorPlan(schoolId, floorId);
        if (!ignore) setPlanUrl(data?.floorPlanImage ?? null);
      } catch (error) {
        if (!ignore) setPlanUrl(null);
        console.log(error);
      }
    };

    fetchFloorPlan();
    return () => {
      ignore = true;
    };
  }, [schoolId, floorId]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-col items-start gap-4">
        <p className="text-body-bold-lg">위치 선택</p>
        <LocationSelectorGroup
          schoolId={schoolId}
          facilityType={facilityTypeParam}
          value={locationData}
          onChange={onChange}
          onFloorSelect={onFloorSelect}
        />
        {planUrl ? (
          <div className="flex w-full justify-center">
            <img
              src={planUrl}
              alt="학교 도면"
              className="border-gray-30 w-full max-w-md rounded-2xl border object-contain"
            />
          </div>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-4">
        <p className="text-body-bold-lg">위치 추가 설명</p>
        <input
          type="text"
          placeholder="예) 교무실 앞 화장실"
          className="w-full rounded-20 border border-gray-40 px-[23px] py-[19px] text-caption-lg text-black outline-none"
          value={locationData.extraDescription ?? ''}
          onChange={(e) =>
            onChange({
              ...locationData,
              extraDescription: e.target.value
            })
          }
        />
      </div>
      <div className="sticky bottom-0 w-full py-4">
        <ActionButton label="다음" disabled={!isComplete} onClick={onNext} />
      </div>
    </div>
  );
}
