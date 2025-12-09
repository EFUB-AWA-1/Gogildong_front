interface ReportSummaryCardProps {
  dimensions?: {
    maxDoorWidth?: number | string;
    doorHandleHeight?: number | string;
    passableWidth?: number | string;
  };
  locationData?: {
    building?: string;
    floor?: string;
    facility?: string;
    extraDescription?: string;
  };
  detail?: {
    threshold?: string;
    doorType?: string;
    extraDescription?: string;
    gender?: string;
  };
  toiletDetail?: {
    gender?: string;
    type?: string;
    door?: string;
    threshold?: string;
  };
}

export default function ReportSummaryCard({
  dimensions,
  locationData,
  detail,
  toiletDetail
}: ReportSummaryCardProps) {
  console.log('dimensions', dimensions);
  const numberRows = [
    { label: '문 최대 가로 길이', value: dimensions?.maxDoorWidth },
    { label: '문 손잡이 높이', value: dimensions?.doorHandleHeight },
    { label: '지나다닐 수 있는 문 폭', value: dimensions?.passableWidth }
  ];

  const textRows = [
    {
      label: '위치',
      value: [
        locationData?.building,
        locationData?.floor,
        locationData?.facility
      ]
        .filter(Boolean)
        .join(' ')
    },
    { label: '위치 추가 설명', value: locationData?.extraDescription },
    { label: '문턱 유무', value: detail?.threshold ?? toiletDetail?.threshold },
    { label: '문 종류', value: detail?.doorType ?? toiletDetail?.door },
    { label: '시설 추가 설명', value: detail?.extraDescription },
    { label: '화장실 종류', value: detail?.gender ?? toiletDetail?.gender }
  ];

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-gray-10 px-[27px] py-5">
      <p className="text-body-bold-lg text-black">제보 요약 정보</p>

      <ul className="flex flex-col gap-3">
        {numberRows.map(({ label, value }) => (
          <li
            key={label}
            className="flex items-center justify-between text-body-md text-black"
          >
            <span className="text-gray-80">{label}</span>
            <span className="text-right text-neon-100">
              {value ?? '-'}
              {value ? <span className="ml-1 text-black">cm</span> : null}
            </span>
          </li>
        ))}
      </ul>

      <div className="h-px w-full bg-gray-20" />

      <ul className="flex flex-col gap-3">
        {textRows.map(({ label, value }) => (
          <li
            key={label}
            className="flex items-center justify-between text-body-md text-black"
          >
            <span className="text-gray-80">{label}</span>
            <span className="text-right text-black">{value || '-'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
