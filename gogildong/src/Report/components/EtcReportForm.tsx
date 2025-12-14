import { useEffect, useState } from 'react';
import ActionButton from '@/common/components/ActionButton';
import LocationSelectorGroup from '@/Report/components/LocationSelectorGroup';
import type { LocationData } from '@/Report/types/report';
import type { FacilityTypeParam } from '@/Report/types/facilityTypes';

interface EtcReportFormProps {
  initialNote?: string;
  locationData: LocationData;
  facilityTypeParam?: FacilityTypeParam;
  schoolId?: number;
  onLocationChange: (data: LocationData) => void;
  onFloorSelect?: (floorId: number | null) => void;
  onChange?: (note: string) => void;
  onSubmit: (note: string) => void;
}

export default function EtcReportForm({
  initialNote,
  locationData,
  facilityTypeParam,
  schoolId,
  onLocationChange,
  onFloorSelect,
  onChange,
  onSubmit
}: EtcReportFormProps) {
  const [note, setNote] = useState(initialNote ?? '');

  useEffect(() => {
    if (initialNote !== undefined) {
      setNote(initialNote);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onChange?.(note);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full flex-col gap-4">
        <p className="text-body-bold-lg">위치 선택</p>
        <LocationSelectorGroup
          schoolId={schoolId}
          facilityType={facilityTypeParam}
          value={locationData}
          onChange={onLocationChange}
          onFloorSelect={onFloorSelect}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-body-bold-lg text-black">제보 설명</p>
        <textarea
          className="min-h-50 w-full rounded-20 border border-gray-40 px-[18px] py-3 text-body-md text-black outline-none"
          placeholder="제보 내용을 입력해 주세요"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="sticky bottom-0 py-4">
        <ActionButton
          label="다음"
          disabled={!note.trim()}
          onClick={() => onSubmit(note.trim())}
        />
      </div>
    </div>
  );
}
