import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/common/components/Header';
import OptionIcon from '../assets/icon_option.svg?react';
import type { FacilityImageType } from '../types/facilityImage';
import PrevImgBtn from '../assets/btn_previmg.svg?react';
import NextImgBtn from '../assets/btn_nextimg.svg?react';
import SingleBtnModal from '../components/modals/SingleBtnModal';
import DoubleBtnModal from '@/ReportView/components/modals/DoubleBtnModal';

type LocationState = {
  photo?: FacilityImageType;
};

export default function PhotoDetail() {
  const { state } = useLocation();
  const { photo } = (state || {}) as LocationState;

  const src = photo?.facilityImage;

  const [showReportButton, setShowReportButton] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [reportResultOpen, setReportResultOpen] = useState(false);

  const handleImageClick = () => {
    setShowArrows((prev) => !prev);
  };

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이미지 클릭 토글 안 일어나게
    console.log('이전 이미지로 이동 (TODO)');
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('다음 이미지로 이동 (TODO)');
  };

  const handleOptionClick = () => {
    setShowReportButton((prev) => !prev);
  };

  const handleReportClick = () => {
    setShowReportButton(false);
    setReportModalOpen(true);
  };

  const handleReportConfirm = () => {
    // TODO: 신고 API 붙일 때 여기에서 처리
    setReportResultOpen(true);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-black">
      <Header
        title="1-A"
        darkMode={true}
        rightElement={
          <div className="relative">
            <OptionIcon
              onClick={handleOptionClick}
              className="h-11 w-11 cursor-pointer"
            />

            {showReportButton && (
              <button
                type="button"
                onClick={handleReportClick}
                className="absolute right-0 mt-2 flex h-9 w-18 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-2 py-1.75 text-body-md leading-6 font-bold text-black opacity-80"
              >
                신고
              </button>
            )}
          </div>
        }
      />

      <div
        onClick={handleImageClick}
        className="flex flex-1 flex-col items-center justify-center overflow-hidden"
      >
        {src && (
          <div className="relative mx-auto w-full">
            <img
              src={src}
              alt="시설 제보 사진"
              className="h-full w-full object-contain"
            />

            {showArrows && (
              <>
                {/* 이전 버튼 */}
                <button
                  type="button"
                  onClick={handlePrevClick}
                  className="absolute top-1/2 left-[0.94rem] z-10 flex h-12 w-12 shrink-0 -translate-y-1/2 items-center justify-center"
                >
                  <PrevImgBtn className="h-full w-full" />
                </button>

                {/* 다음 버튼 */}
                <button
                  type="button"
                  onClick={handleNextClick}
                  className="absolute top-1/2 right-[0.94rem] z-10 flex h-12 w-12 shrink-0 -translate-y-1/2 items-center justify-center"
                >
                  <NextImgBtn className="h-full w-full" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mr-5 mb-10 ml-5 flex h-21 flex-row items-end justify-between leading-4.5 font-normal text-white">
        {/* 사용자 프로필, 제보일 */}
        <div className="flex items-center gap-3">
          <div className="h-5.5 w-5.25 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            <span className="text-[0.875rem] font-medium">불멸의 이순신</span>
            <span>·</span>
            <span className="text-[0.75rem]">2025-09-21</span>
          </div>
        </div>

        {/* 제보 값 부분*/}
        <div className="flex flex-col items-end text-[0.875rem] font-medium">
          <span>폭: 108 cm</span>
          <span>활동 공간: 120 cm</span>
        </div>
      </div>

      <DoubleBtnModal
        open={reportModalOpen}
        title="사진을 신고할까요?"
        label="신고하기"
        onClose={() => setReportModalOpen(false)}
        onConfirm={handleReportConfirm}
      />

      <SingleBtnModal
        open={reportResultOpen}
        title="신고가 제출되었습니다"
        message={'신고 3회 이상 누적 시 \n검토 후 사진이 차단됩니다.'}
        label="확인"
        onClose={() => setReportResultOpen(false)}
      />
    </div>
  );
}
