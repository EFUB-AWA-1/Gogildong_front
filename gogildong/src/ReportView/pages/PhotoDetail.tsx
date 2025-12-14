import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/common/components/Header';
import OptionIcon from '../assets/icon_option.svg?react';
import type { ReportImage } from '@/FacilityView/types/facilityImage';
import PrevImgBtn from '../assets/btn_previmg.svg?react';
import NextImgBtn from '../assets/btn_nextimg.svg?react';
import SingleBtnModal from '../components/modals/SingleBtnModal';
import DoubleBtnModal from '@/ReportView/components/modals/DoubleBtnModal';
import ReportSummary from '@/ReportView/components/ReportSummary';
import InfoIcon from '../assets/icon_infor.svg?react';

// API 및 타입
import { getReportSummary } from '@/ReportView/api/getReportSummary';
import { postFacilityFlag } from '@/ReportView/api/postFacilityFlag';
import type { ReportSummaryViewData } from '@/ReportView/types/reportSummary';

type LocationState = {
  photos?: ReportImage[];
  initialReportId?: number;
  facilityType?: string;
  facilityId?: number; // [추가]
};

export default function PhotoDetail() {
  const { state } = useLocation();
  const { photos = [], initialReportId, facilityType = 'etc', facilityId } = (state || {}) as LocationState;

  const [showReportButton, setShowReportButton] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [reportResultOpen, setReportResultOpen] = useState(false);
  const [reportSummaryOpen, setReportSummaryOpen] = useState(false);
  const [summaryData, setSummaryData] = useState<ReportSummaryViewData>({ kind: 'empty' });

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (!initialReportId) return 0;
    const idx = photos.findIndex((p) => p.reportId === initialReportId);
    return idx === -1 ? 0 : idx;
  });

  const currentPhoto = photos[currentIndex];
  const src = currentPhoto?.facilityImage;
  const uploaderName = currentPhoto?.userName || "알 수 없음";
  const uploadDate = currentPhoto?.createdAt 
    ? new Date(currentPhoto.createdAt).toISOString().split('T')[0] 
    : "날짜 정보 없음";

  const handleImageClick = () => setShowArrows((prev) => !prev);
  const handlePrevClick = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev)); };
  const handleNextClick = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : prev)); };
  const handleOptionClick = () => setShowReportButton((prev) => !prev);
  const handleReportClick = () => { setShowReportButton(false); setReportModalOpen(true); };

  // [수정] 신고 확정 (API 호출)
  const handleReportConfirm = async () => {
    if (!facilityId || !currentPhoto?.reportId) {
      console.error("시설 ID 또는 리포트 ID가 없습니다.");
      return;
    }

    try {
      // 신고 사유는 현재 UI에서 선택 기능이 없으므로 고정값 사용 (또는 추후 UI 추가)
      const REASON = "개인정보 노출"; 
      
      await postFacilityFlag(facilityId, currentPhoto.reportId, REASON);
      
      setReportResultOpen(true); // 성공 모달 표시
    } catch (error) {
      console.error("신고 실패:", error);
      alert("신고 처리에 실패했습니다.");
    }
  };

  const handleInfoIconClick = async () => {
    if (!currentPhoto?.reportId) return;
    try {
      const data = await getReportSummary(facilityType, currentPhoto.reportId);
      const formattedData = transformSummaryData(facilityType, data);
      setSummaryData(formattedData);
      setReportSummaryOpen(true);
    } catch (error) {
      console.error("요약 정보 조회 실패:", error);
      setSummaryData({ kind: 'empty' });
      setReportSummaryOpen(true);
    }
  };

  const transformSummaryData = (type: string, data: any): ReportSummaryViewData => {
    const safeType = type.toLowerCase();
    if (safeType === 'etc') return { kind: 'description', description: data.note || '설명 없음' };
    if (safeType === 'restroom') return { kind: 'lines', lines: [{ label: '입구 문', kind: 'size', width: data.entranceDoorWidth, height: data.entranceDoorHeight }, { label: '내부 문', kind: 'size', width: data.innerDoorWidth, height: data.innerDoorHeight }, { label: '대변기 높이', kind: 'value', value: data.toiletHeight }] };
    if (safeType === 'elevator') return { kind: 'lines', lines: [{ label: '출입문 폭', kind: 'value', value: data.doorWidth }, { label: '내부 깊이', kind: 'value', value: data.interiorDepth }, { label: '조작반 높이', kind: 'value', value: data.maxControlPanelHeight }] };
    if (safeType === 'classroom') return { kind: 'lines', lines: [{ label: '출입문 폭', kind: 'value', value: data.doorWidth }, { label: '손잡이 높이', kind: 'value', value: data.doorHandleHeight }, { label: '통로 유효 폭', kind: 'value', value: data.minAisleWidth }] };
    return { kind: 'empty' };
  };

  return (
    <div className="flex h-screen w-full flex-col bg-black">
      <Header title="1-A" darkMode={true} rightElement={
          <div className="relative">
            <OptionIcon onClick={handleOptionClick} className="h-11 w-11 cursor-pointer" />
            {showReportButton && (
              <button type="button" onClick={handleReportClick} className="absolute right-0 mt-2 flex h-9 w-18 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-2 py-1.75 text-body-md leading-6 font-bold text-black opacity-80">
                신고
              </button>
            )}
          </div>
        }
      />

      <div onClick={handleImageClick} className="flex flex-1 flex-col items-center justify-center overflow-hidden">
        {src && (
          <div className="relative mx-auto w-full">
            <img src={src} alt="시설 제보 사진" className="h-full w-full object-contain" />
            {showArrows && (
              <>
                {currentIndex > 0 && (
                  <button type="button" onClick={handlePrevClick} className="absolute top-1/2 left-[0.94rem] z-10 flex h-12 w-12 shrink-0 -translate-y-1/2 items-center justify-center">
                    <PrevImgBtn className="h-full w-full" />
                  </button>
                )}
                {currentIndex < photos.length - 1 && (
                  <button type="button" onClick={handleNextClick} className="absolute top-1/2 right-[0.94rem] z-10 flex h-12 w-12 shrink-0 -translate-y-1/2 items-center justify-center">
                    <NextImgBtn className="h-full w-full" />
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="mr-5 mb-10 ml-5 flex h-21 flex-row items-end justify-between leading-4.5 font-normal text-white">
        <div className="flex items-center gap-3">
          <div className="h-5.5 w-5.25 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            <span className="text-[0.875rem] font-medium">{uploaderName}</span>
            <span>·</span>
            <span className="text-[0.75rem]">{uploadDate}</span>
          </div>
        </div>
        <div className="font- flex flex-row items-center gap-1 text-[0.875rem] font-medium">
          <span>제보 요약 정보</span>
          <InfoIcon className="h-5 w-5 cursor-pointer" onClick={handleInfoIconClick} />
        </div>
      </div>

      <DoubleBtnModal open={reportModalOpen} title="사진을 신고할까요?" label="신고하기" onClose={() => setReportModalOpen(false)} onConfirm={handleReportConfirm} />
      <SingleBtnModal open={reportResultOpen} title="신고가 제출되었습니다" message={'신고 3회 이상 누적 시 \n검토 후 사진이 차단됩니다.'} label="확인" onClose={() => setReportResultOpen(false)} />
      <ReportSummary open={reportSummaryOpen} title="제보 요약 정보" data={summaryData} onClose={() => setReportSummaryOpen(false)} />
    </div>
  );
}