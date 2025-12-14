import OptionIcon from '../../assets/icon_option_black.svg?react';
import ThumbIcon from '../../assets/icon_thumb.svg?react';
import ThumbIconOn from '../../assets/icon_thumb_on.svg?react';
import { useEffect, useRef, useState } from 'react';
import DoubleBtnModal from '../modals/DoubleBtnModal';
import SingleBtnModal from '@/ReportView/components/modals/SingleBtnModal';
import { deleteReview } from '@/ReportView/api/deleteReview';
import { reportReview } from '@/ReportView/api/reportReview';
import type { Review } from '@/FacilityView/types/review';

interface ReviewCardProps {
  review: Review;
  isMine?: boolean; // 내 글 여부
  onDelete?: (id: number) => void;
  onClick?: () => void;
}

export default function ReviewCard({
  review,
  isMine = false,
  onDelete,
  onClick
}: ReviewCardProps) {
  const { userName, reviewText, likeCount, createdAt, reviewId } = review;

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(likeCount);

  // 메뉴/모달 상태 관리
  const [openMenu, setOpenMenu] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openReportConfirm, setOpenReportConfirm] = useState(false);
  const [reportResultOpen, setReportResultOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const optionLabel = isMine ? '삭제하기' : '신고하기';

  // 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    if (openMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenu]);

  // 날짜 포맷팅 (YYYY-MM-DD)
  const formattedDate = createdAt
    ? new Date(createdAt).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  // 좋아요 버튼 (이벤트 전파 방지)
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  // 메뉴 버튼 (이벤트 전파 방지)
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenu((prev) => !prev);
  };

  // 모달 옵션 선택 (삭제/신고)
  const handleModalOption = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMine) {
      setOpenMenu(false);
      setOpenDeleteModal(true);
    } else {
      setOpenMenu(false);
      setOpenReportConfirm(true);
    }
  };

  // 실제 삭제 API 호출
  const handleConfirmDelete = async () => {
    try {
      await deleteReview(reviewId);
      console.log(`리뷰 삭제 성공: ${reviewId}`);
      setOpenDeleteModal(false);
      if (onDelete) onDelete(reviewId);
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
      setOpenDeleteModal(false);
    }
  };

  const handleConfirmReport = async () => {
    try {
      await reportReview(reviewId);
      console.log(`리뷰 신고 성공: ${reviewId}`);
      setOpenReportConfirm(false);
      setReportResultOpen(true);
    } catch (error) {
      console.error('리뷰 신고 실패:', error);
      setOpenReportConfirm(false);
    }
  };

  return (
    <section
      role={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`relative flex w-full max-w-[480px] flex-col items-center gap-3 p-4 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <article className="flex w-full flex-col items-end gap-1 rounded-2xl bg-white py-2 shadow-[0_0_4px_rgba(0,0,0,0.10)]">
        <div className="flex w-full items-center justify-between pr-2 pl-3">
          {/* 프로필 및 날짜 */}
          <div className="flex w-51 items-center gap-2">
            <div className="h-5.25 w-5.25 shrink-0 rounded-full bg-gray-10" />
            <span className="text-[0.875rem] leading-150 font-bold text-black">
              {userName}
            </span>
            <span className="text-caption-md text-gray-60">
              {formattedDate}
            </span>
          </div>

          {/* 옵션 메뉴 */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={handleMenuToggle}
              className="flex h-8.5 w-8.5 items-center justify-center"
            >
              <OptionIcon className="h-8.5 w-8.5" />
            </button>

            {openMenu && (
              <button
                type="button"
                onClick={handleModalOption}
                className="absolute top-full right-3 mt-1 flex w-15 items-center justify-center gap-2 rounded-md bg-white p-2 text-caption-md text-black shadow-[0_0_4px_rgba(0,0,0,0.15)]"
              >
                {optionLabel}
              </button>
            )}
          </div>
        </div>

        {/* 리뷰 텍스트 */}
        <div className="flex w-full items-center justify-center gap-2 self-stretch px-[1.72rem]">
          <p className="w-full text-body-sm break-all whitespace-pre-wrap text-black">
            {reviewText}
          </p>
        </div>

        {/* 추천 버튼 */}
        <div className="flex w-full px-3 pt-1 pb-2">
          <button
            type="button"
            onClick={handleLikeClick}
            className={`flex h-6.5 items-center gap-2.5 rounded-20 border ${
              isLiked ? 'border-neon-100' : 'border-gray-20'
            } bg-white px-2.5`}
          >
            {isLiked ? (
              <ThumbIconOn className="h-3 w-3" />
            ) : (
              <ThumbIcon className="h-3 w-3" />
            )}
            <span
              className={`text-body-sm ${
                isLiked ? 'text-neon-100' : 'text-gray-80'
              }`}
            >
              추천 {likes}
            </span>
          </button>
        </div>
      </article>

      {/* 모달들 */}
      <DoubleBtnModal
        open={openDeleteModal}
        title="이 리뷰를 삭제할까요?"
        label="확인"
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
      <DoubleBtnModal
        open={openReportConfirm}
        title="리뷰를 신고할까요?"
        label="신고하기"
        onClose={() => setOpenReportConfirm(false)}
        onConfirm={handleConfirmReport}
      />
      <SingleBtnModal
        open={reportResultOpen}
        title="신고가 제출되었습니다"
        message={'신고 3회 이상 누적 시 \n검토 후 리뷰가 차단됩니다.'}
        label="확인"
        onClose={() => setReportResultOpen(false)}
      />
    </section>
  );
}
