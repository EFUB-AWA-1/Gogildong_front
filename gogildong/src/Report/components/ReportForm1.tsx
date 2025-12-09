import LocationSelectorGroup from './LocationSelectorGroup';
import ActionButton from '@/common/components/ActionButton';
import SameplePlan from '@/Report/assets/imgs/samplePlan.png';
import type { LocationData } from '../types/report';
import MeasurementInputSection from '@/Report/components/MeasurementInputSection';
import type { FacilityType } from '@/Report/types/facilityTypes';
import type { Measurements } from '@/Report/types/measurement';

interface ReportForm1Props {
  facilityType: FacilityType;
  locationData: LocationData;
  measurements?: Measurements;
  onChange: (data: LocationData) => void;
  onMeasurementsChange?: (value: Measurements) => void;
  onNext: () => void;
}

export default function ReportForm1({
  facilityType,
  locationData,
  measurements,
  onChange,
  onMeasurementsChange,
  onNext
}: ReportForm1Props) {
  const isComplete =
    locationData.building && locationData.floor && locationData.facility;

  return (
    <div className="flex flex-col items-center gap-6">
      <MeasurementInputSection
        facilityType={facilityType}
        value={measurements}
        onChange={onMeasurementsChange}
      />
      <div className="flex w-full flex-col items-start gap-4">
        <p className="text-body-bold-lg">위치 선택</p>
        <div className="flex w-full justify-center">
          <img src={SameplePlan} alt="학교 도면" />
        </div>
      </div>
      <LocationSelectorGroup onChange={onChange} />
      <div className="flex w-full flex-col gap-4">
        <p className="text-body-bold-lg">추가 정보</p>
        <input
          type="text"
          placeholder="예) 교무실 앞 화장실"
          className="w-full rounded-[1.25rem] border border-gray-40 px-[23px] py-[19px] text-caption-lg text-black outline-none"
        />
      </div>
      <div className="w-full bg-white py-4">
        <ActionButton label="다음" disabled={!isComplete} onClick={onNext} />
      </div>
    </div>
  );
}
