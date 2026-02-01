// src/Mypage/pages/MyReportDetail.tsx
import Header from '@/common/components/Header';
import LocationIcon from '@/Report/assets/svgs/location.svg?react';
import ReportSummaryCard from '@/Report/components/ReportSummaryCard';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type ReportDetailState = {
  id: number;
  date: string; // "2025.10.10"
  facilityType: '화장실' | '교실' | '엘리베이터' | '기타';
  photo?: string;
  locationData?: {
    building?: string;
    floor?: string;
    facility?: string;
    extraDescription?: string;
  };
  dimensions?: any; // 프로젝트에서 Measurements 타입 있으면 그걸로 교체 권장
  detail?: Record<string, string>;
};

export default function MyReportDetail() {
  const navigate = useNavigate();
  const { reportId } = useParams<{ reportId: string }>();
  const { state } = useLocation();

  //더미
  const report = state as ReportDetailState | undefined;

  const handleBack = () => navigate(-1);

  return (
    <div className="bg-gray-5 min-h-dvh w-full">
      <Header title="내 제보 관리" onBackClick={handleBack} />

      <div className="mx-auto flex max-w-screen-sm flex-col gap-6 px-6 py-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-heading-md text-black">
            {report?.facilityType ?? '제보'}
          </p>
          <p className="text-body-sm text-gray-40">{report?.date ?? '-'}</p>

          <div className="mt-2 flex flex-col items-center gap-4">
            <div className="h-50 w-30.5 rounded-[1.5625rem] border-[6px] border-neon-100">
              <img
                src={report?.photo}
                alt="제보 사진"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="text-body-bold-sm flex items-center gap-2 text-black">
              <LocationIcon />
              {'이화여자대학교부속초등학교'}
            </div>
          </div>
        </div>

        <ReportSummaryCard
          facilityType={report?.facilityType ?? '기타'}
          locationData={report?.locationData}
          dimensions={report?.dimensions}
          detail={report?.detail}
        />
      </div>
    </div>
  );
}
