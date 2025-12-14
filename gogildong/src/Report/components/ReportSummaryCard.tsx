import type { Measurements } from '@/Report/types/measurement';
import type { FacilityType } from '@/Report/types/facilityTypes';

interface ReportSummaryCardProps {
  facilityType: FacilityType;
  dimensions?: Measurements;
  locationData?: {
    building?: string;
    floor?: string;
    facility?: string;
    extraDescription?: string;
  };
  detail?: Record<string, string>;
}

export default function ReportSummaryCard({
  facilityType,
  dimensions,
  locationData,
  detail
}: ReportSummaryCardProps) {
  const numberRows: Array<
    | { label: string; type: 'pair'; width?: string; height?: string }
    | { label: string; type: 'single'; value?: string | number }
  > = (() => {
    switch (facilityType) {
      case '화장실':
        return [
          {
            label: '화장실 출입문',
            type: 'pair',
            width: dimensions?.entranceDoorWidth,
            height: dimensions?.entranceDoorHeight
          },
          {
            label: '내부 문',
            type: 'pair',
            width: dimensions?.innerDoorWidth,
            height: dimensions?.innerDoorHeight
          },
          {
            label: '변기 높이',
            type: 'single',
            value: dimensions?.toiletHeight
          }
        ];
      case '엘리베이터':
        return [
          {
            label: '엘리베이터 문 폭',
            type: 'single',
            value: dimensions?.doorWidth
          },
          {
            label: '엘리베이터 내부 깊이',
            type: 'single',
            value: dimensions?.interiorDepth
          },
          {
            label: '버튼 높이',
            type: 'single',
            value: dimensions?.maxControlPanelHeight
          }
        ];
      case '교실':
        return [
          {
            label: '문 최대 가로 길이',
            type: 'single',
            value: dimensions?.maxDoorWidth
          },
          {
            label: '문 손잡이 높이',
            type: 'single',
            value: dimensions?.doorHandleHeight
          },
          {
            label: '지나다닐 수 있는 문 폭',
            type: 'single',
            value: dimensions?.minAisleWidth
          }
        ];
      case '기타':
      default:
        return [];
    }
  })();

  const baseLocation = [
    {
      label: '위치',

      value: [
        locationData?.building,
        locationData?.floor
          ? locationData.floor.includes('층')
            ? locationData.floor
            : `${locationData.floor}층`
          : undefined,
        locationData?.facility
      ]
        .filter(Boolean)
        .join(' ')
    }
  ];

  const textRows = (() => {
    switch (facilityType) {
      case '화장실':
        return [
          ...baseLocation,
          { label: '위치 추가 설명 ', value: locationData?.extraDescription },
          { label: '칸 종류', value: detail?.stallType },
          { label: '문 종류', value: detail?.doorType },
          { label: '손잡이 유무', value: detail?.grabBar }
        ];
      case '엘리베이터':
        return [
          ...baseLocation,
          { label: '위치 추가 설명 ', value: locationData?.extraDescription },
          { label: '승인 없이 이용 여부', value: detail?.accessApproval },
          { label: '수업 중 이용 가능 여부', value: detail?.classUse },
          { label: '시설 추가 설명', value: detail?.extraDescription }
        ];
      case '교실':
        return [
          ...baseLocation,
          { label: '위치 추가 설명 ', value: locationData?.extraDescription },
          { label: '교실 문턱 유무', value: detail?.threshold },
          { label: '교실 문 종류', value: detail?.doorType },
          { label: '시설 추가 설명', value: detail?.extraDescription }
        ];
      case '기타':
        return [{ label: '제보 설명', value: locationData?.extraDescription }];
    }
  })();

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-gray-10 px-[27px] py-5">
      <p className="text-body-bold-md text-black">제보 요약 정보</p>

      <ul className="flex flex-col gap-3">
        {numberRows.map((row) =>
          row.type === 'single' ? (
            <li
              key={row.label}
              className="flex items-center justify-between text-body-sm text-black"
            >
              <span className="text-gray-80">{row.label}</span>
              <span className="text-body-bold-md text-right text-neon-100">
                {row.value ?? '-'}
                {row.value ? (
                  <span className="text-body-bold-sm pl-4 text-black">cm</span>
                ) : null}
              </span>
            </li>
          ) : (
            <li
              key={row.label}
              className="flex items-center justify-between text-body-sm text-black"
            >
              <span className="text-gray-80">{row.label}</span>
              <span className="text-body-bold-md flex items-center gap-4 text-neon-100">
                <span>{row.width ?? '-'}</span>
                <span className="text-body-bold-sm text-black">x</span>
                <span>{row.height ?? '-'}</span>
                <span className="text-body-bold-sm text-black">cm</span>
              </span>
            </li>
          )
        )}
      </ul>

      <div className="h-px w-full bg-gray-20" />

      <ul className="flex flex-col gap-3">
        {textRows.map(({ label, value }) => (
          <li
            key={label}
            className="flex items-center justify-between text-black"
          >
            <span className="text-body-sm text-gray-80">{label}</span>
            <span className="text-body-bold-sm text-right text-black">
              {value || '-'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
