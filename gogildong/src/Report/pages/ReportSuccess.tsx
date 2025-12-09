import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '@/common/components/Header';
import LocationIcon from '@/Report/assets/svgs/location.svg?react';
import ReportSummaryCard from '@/Report/components/ReportSummaryCard';
import SampleImg from '@/Report/assets/imgs/img_sample.png';
import {
  toFacilityLabel,
  type FacilityTypeParam
} from '@/Report/types/facilityTypes';
import type { Measurements } from '@/Report/types/measurement';

interface SuccessState {
  photo?: string;
  facilityType?: string;
  locationData?: {
    building?: string;
    floor?: string;
    facility?: string;
    extraDescription?: string;
  };
  toiletDetail?: {
    gender?: string;
    type?: string;
    door?: string;
    threshold?: string;
    extraDescription?: string;
  };
  dimensions?: Measurements;
}

export default function ReportSuccess() {
  const navigate = useNavigate();
  const { facilityType: facilityTypeParam } = useParams<{
    facilityType: FacilityTypeParam;
  }>();
  const facilityType = toFacilityLabel(facilityTypeParam);
  const { state } = useLocation();
  const { photo, locationData, toiletDetail, dimensions } =
    (state as SuccessState) || {};

  const handleBack = () => {
    navigate('/home');
  };
  return (
    <div className="bg-gray-5 min-h-dvh w-full">
      <Header
        title={facilityType ? `${facilityType} 촬영` : '제보 완료'}
        onBackClick={handleBack}
      />

      <div className="mx-auto flex max-w-screen-sm flex-col gap-6 px-6 py-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-body-bold-md text-black">
            제보가 성공적으로 등록되었어요!
          </p>
          <div className="gap flex flex-col">
            <p className="text-gray-70 text-body-sm">
              <span className="text-body-bold-sm">nn 포인트</span>가
              지급되었습니다.
            </p>
            <p className="text-body-sm text-black">
              <span
                className="cursor-pointer underline"
                onClick={() => navigate('/mypage')}
              >
                마이페이지
              </span>
              에서 확인해 보세요!
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="h-50 w-[133px] rounded-3xl border-[6px] border-neon-100">
              <img
                src={photo ?? SampleImg}
                alt="촬영된 사진"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
            <div className="text-body-bold-sm flex items-center gap-2 text-black">
              <LocationIcon />
              {facilityType ?? '이화여자대학교부속초등학교'}
            </div>
          </div>
        </div>

        <ReportSummaryCard
          facilityType={facilityType ?? '기타'}
          locationData={locationData}
          toiletDetail={toiletDetail}
          dimensions={dimensions}
          detail={{
            doorType: toiletDetail?.door,
            extraDescription: toiletDetail?.extraDescription,
            threshold: toiletDetail?.threshold,
            gender: toiletDetail?.gender
          }}
        />
      </div>
    </div>
  );
}
