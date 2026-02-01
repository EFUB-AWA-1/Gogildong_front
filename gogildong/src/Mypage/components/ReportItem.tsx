// src/Mypage/components/ReportItem.tsx
import { useNavigate } from 'react-router-dom';
import ReportImg from '../assets/ReportImg.png';

type Report = {
  id: number;
  date: string; // "2025.10.10"
  facilityType: '화장실' | '교실' | '엘리베이터' | '기타';
  locationText: string; // "본관 1층, 교무실 옆 화장실"
  photo?: string;
  // 아래는 상세에서 요약카드에 쓰려고 미리 준비(더미)
  locationData?: {
    building?: string;
    floor?: string;
    facility?: string;
    extraDescription?: string;
  };
  dimensions?: Record<string, string | number>;
  detail?: Record<string, string>;
};

export default function ReportItem({ report }: { report: Report }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/mypage/myreports/${report.id}`, {
      state: report // ✅ 지금은 더미이므로 통째로 넘겨도 OK
    });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className="flex w-full items-center gap-4 rounded-[1.625rem] bg-white p-4 shadow-[0_0_4px_0_rgba(0,0,0,0.10)] hover:bg-gray-10"
    >
      <div className="h-[6.159rem] w-[5.86569rem] overflow-hidden rounded-2xl bg-gray-20">
        <img
          src={report.photo ?? ReportImg}
          alt="제보이미지"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-[0.38rem]">
        <div className="self-stretch text-body-xs text-gray-40">
          {report.date}
        </div>
        <div className="self-stretch text-[1rem] leading-150 font-bold text-black">
          {report.facilityType}
        </div>
        <div className="self-stretch text-body-xs text-black">
          {report.locationText}
        </div>
      </div>
    </div>
  );
}
