import ChatIcon from '@/FacilityView/assets/svgs/chat.svg?react';
import ThumbsUpIcon from '@/FacilityView/assets/svgs/icon_thumb.svg?react';
import MoreIcon from '@/FacilityView/assets/svgs/three_dots_vertical.svg?react';
import { useState, useEffect, useRef } from 'react';

import type { Review } from '@/FacilityView/types/review';
import { postReviewLike, deleteReviewLike } from '@/ReportView/api/reviewLike';
import { reportReview } from '@/ReportView/api/reportReview';

import DoubleBtnModal from '@/ReportView/components/modals/DoubleBtnModal';
import SingleBtnModal from '@/ReportView/components/modals/SingleBtnModal';

interface ReviewCardProps {
  review: Review;
  onClick?: () => void;
  isMine?: boolean;
  onDelete?: (deletedReviewId: number) => void;
}

export default function ReviewCard({
  review,
  onClick,
  isMine = false,
  onDelete
}: ReviewCardProps) {
  const {
    userName,
    reviewText,
    likeCount,
    commentCount,
    createdAt,
    reviewId,
    likedByUser
  } = review;

  const [isLiked, setIsLiked] = useState(likedByUser);
  const [likes, setLikes] = useState(likeCount);

  // 모달 상태
  const [openMenu, setOpenMenu] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openReportConfirm, setOpenReportConfirm] = useState(false);
  const [reportResultOpen, setReportResultOpen] = useState(false);

  // (추가) 이미 신고된 경우 알림 모달 상태
  const [duplicateReportOpen, setDuplicateReportOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const optionLabel = isMine ? '삭제하기' : '신고하기';

  useEffect(() => {
    setIsLiked(likedByUser);
    setLikes(likeCount);
  }, [likedByUser, likeCount]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    if (openMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenu]);

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const prevIsLiked = isLiked;
    setIsLiked(!prevIsLiked);
    setLikes((prev) => (prevIsLiked ? prev - 1 : prev + 1));

    try {
      if (prevIsLiked) {
        await deleteReviewLike(reviewId);
      } else {
        await postReviewLike(reviewId);
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      setIsLiked(prevIsLiked);
      setLikes(likeCount);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenu((prev) => !prev);
  };

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

  const handleConfirmDelete = () => {
    if (onDelete) onDelete(reviewId);
    setOpenDeleteModal(false);
  };

  // 신고 API 호출 및 중복 신고 처리
  const handleConfirmReport = async () => {
    try {
      await reportReview(reviewId);
      console.log(`리뷰 신고 성공: ${reviewId}`);
      setOpenReportConfirm(false);
      setReportResultOpen(true);
    } catch (error: any) {
      console.error('리뷰 신고 실패:', error);
      setOpenReportConfirm(false);

      // 409 Conflict 에러 체크
      if (error.response && error.response.status === 409) {
        setDuplicateReportOpen(true);
      }
    }
  };

  const formattedDate = createdAt
    ? new Date(createdAt).toISOString().split('T')[0]
    : '';

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      className={`rounded-2xl border border-gray-20 bg-white p-4 shadow-sm ${
        onClick ? 'cursor-pointer transition hover:shadow-md' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-20" />
          <div className="flex items-center gap-2">
            <p className="text-body-bold-md text-black">{userName}</p>
            <span className="text-caption-md text-gray-80">
              {formattedDate}
            </span>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={handleMenuClick}
            className="flex h-8 w-8 items-center justify-center"
          >
            <MoreIcon />
          </button>

          {openMenu && (
            <button
              type="button"
              onClick={handleModalOption}
              className="absolute top-full right-0 z-10 mt-1 flex w-16 items-center justify-center gap-2 rounded-md bg-white p-2 text-caption-md text-black shadow-md"
            >
              {optionLabel}
            </button>
          )}
        </div>
      </div>

      <p className="mt-2 text-body-md break-all whitespace-pre-wrap text-black">
        {reviewText}
      </p>

      <div className="mt-3 flex gap-2 text-body-sm">
        <button
          onClick={handleLikeClick}
          className={`flex items-center gap-2.5 rounded-20 border px-2.5 py-[2.5px] transition-colors duration-200 ${
            isLiked
              ? 'border-neon-100 bg-neon-15 text-neon-100'
              : 'border-gray-20 bg-white text-gray-80'
          }`}
        >
          <ThumbsUpIcon
            className={isLiked ? 'fill-neon-100 text-neon-100' : 'text-gray-80'}
          />
          <span>추천 {likes}</span>
        </button>
        <div className="flex items-center gap-2.5 rounded-20 border border-gray-20 px-2.5 py-[2.5px] text-gray-80">
          <ChatIcon />
          <span>댓글 {commentCount}</span>
        </div>
      </div>

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

      {/* [추가] 중복 신고 알림 모달 */}
      <SingleBtnModal
        open={duplicateReportOpen}
        title="알림"
        message="이미 신고 처리된 리뷰입니다."
        label="확인"
        onClose={() => setDuplicateReportOpen(false)}
      />
    </div>
  );
}
