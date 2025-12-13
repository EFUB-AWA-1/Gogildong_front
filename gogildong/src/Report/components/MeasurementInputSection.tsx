import { useEffect, useState } from 'react';
import type { FacilityType } from '@/Report/types/facilityTypes';
import type { Measurements } from '@/Report/types/measurement';

interface MeasurementInputSectionProps {
  facilityType: FacilityType;
  value?: Measurements;
  onChange?: (value: Measurements) => void;
}

type FieldConfig =
  | {
      kind: 'pair';
      label: string;
      widthKey: keyof Measurements;
      heightKey: keyof Measurements;
    }
  | {
      kind: 'single';
      label: string;
      key: keyof Measurements;
    };

const FIELD_BY_TYPE: Record<FacilityType, FieldConfig[]> = {
  화장실: [
    {
      kind: 'pair',
      label: '화장실 출입문',
      widthKey: 'entranceDoorWidth',
      heightKey: 'entranceDoorHeight'
    },
    {
      kind: 'pair',
      label: '내부 문',
      widthKey: 'innerDoorWidth',
      heightKey: 'innerDoorHeight'
    },
    { kind: 'single', label: '변기 높이', key: 'toiletHeight' }
  ],
  엘리베이터: [
    { kind: 'single', label: '엘리베이터 문 폭', key: 'doorWidth' },
    { kind: 'single', label: '엘리베이터 내부 깊이', key: 'interiorDepth' },
    { kind: 'single', label: '버튼 높이', key: 'maxControlPanelHeight' }
  ],
  교실: [
    { kind: 'single', label: '문 최대 가로 길이', key: 'maxDoorWidth' },
    { kind: 'single', label: '문 손잡이 높이', key: 'doorHandleHeight' },
    { kind: 'single', label: '지나다닐 수 있는 문 폭', key: 'minAisleWidth' }
  ],
  기타: []
};

export default function MeasurementInputSection({
  facilityType,
  value,
  onChange
}: MeasurementInputSectionProps) {
  const [measurements, setMeasurements] = useState<Measurements>(value ?? {});

  useEffect(() => {
    setMeasurements(value ?? {});
  }, [facilityType, value]);

  const fields = FIELD_BY_TYPE[facilityType] ?? [];
  if (!fields.length) return null;

  const updateMeasurements = (next: Measurements) => {
    setMeasurements(next);
    onChange?.(next);
  };

  const handleSingleChange = (key: keyof Measurements, val: string) => {
    updateMeasurements({ ...measurements, [key]: val });
  };

  const handlePairChange = (
    widthKey: keyof Measurements,
    heightKey: keyof Measurements,
    widthVal: string,
    heightVal: string
  ) => {
    updateMeasurements({
      ...measurements,
      [widthKey]: widthVal,
      [heightKey]: heightVal
    });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-body-bold-lg text-black">수치 입력</p>
      <div className="flex flex-col gap-4">
        {fields.map((field) => {
          if (field.kind === 'single') {
            return (
              <div
                key={field.label}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-body-md text-gray-60">{field.label}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    className="w-16 rounded-xl border border-gray-40 px-3 py-2 text-center text-body-lg text-neon-100 outline-none"
                    value={measurements[field.key] ?? ''}
                    onChange={(e) =>
                      handleSingleChange(field.key, e.target.value)
                    }
                  />
                  <span className="text-body-bold-md text-black">cm</span>
                </div>
              </div>
            );
          }

          const widthVal = measurements[field.widthKey] ?? '';
          const heightVal = measurements[field.heightKey] ?? '';
          return (
            <div
              key={field.label}
              className="flex items-center justify-between gap-3"
            >
              <span className="text-body-md text-gray-60">{field.label}</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  className="w-16 rounded-xl border border-gray-40 px-3 py-2 text-center text-body-md text-neon-100 outline-none"
                  value={widthVal}
                  onChange={(e) =>
                    handlePairChange(
                      field.widthKey,
                      field.heightKey,
                      e.target.value,
                      heightVal
                    )
                  }
                />
                <span className="text-body-md text-black">x</span>
                <input
                  type="number"
                  inputMode="decimal"
                  className="w-16 rounded-xl border border-gray-40 px-3 py-2 text-center text-body-md text-neon-100 outline-none"
                  value={heightVal}
                  onChange={(e) =>
                    handlePairChange(
                      field.widthKey,
                      field.heightKey,
                      widthVal,
                      e.target.value
                    )
                  }
                />
                <span className="text-body-md text-black">cm</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
