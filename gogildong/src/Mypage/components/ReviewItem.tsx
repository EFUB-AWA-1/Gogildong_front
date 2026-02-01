import ChatIcon from '@/FacilityView/assets/svgs/chat.svg?react';
import ThumbsUpGrayIcon from '@/FacilityView/assets/svgs/icon_thumb_gray.svg?react';
import ThumbsUpIcon from '@/FacilityView/assets/svgs/icon_thumb.svg?react';
import MoreIcon from '@/FacilityView/assets/svgs/three_dots_vertical.svg?react';
import { useEffect, useRef, useState } from 'react';

import type { Review } from '@/FacilityView/types/review';
import { deleteReviewLike, postReviewLike } from '@/ReportView/api/reviewLike';

interface ReviewItemProps {
  review: Review;
  title: string; // 예: "2-A"
  subTitle: string; // 예: "본관 2층 | 교무실 앞 (2025-09-21 기준)"

  onPlaceClick?: () => void;
  onReviewDetailClick?: () => void;
  onDelete?: (deletedReviewId: number) => void;

  onClick?: () => void;
}

export default function ReviewItem({
  review,
  title,
  subTitle,
  onPlaceClick,
  onReviewDetailClick,
  onDelete,
  onClick
}: ReviewItemProps) {
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

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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

  const formattedDate = createdAt
    ? new Date(createdAt).toISOString().split('T')[0]
    : '';

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const prevIsLiked = isLiked;
    setIsLiked(!prevIsLiked);
    setLikes((prev) => (prevIsLiked ? prev - 1 : prev + 1));

    try {
      if (prevIsLiked) await deleteReviewLike(reviewId);
      else await postReviewLike(reviewId);
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

  const handleClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenu(false);
    onDelete?.(reviewId);
  };

  const handlePlaceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlaceClick?.();
  };

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      className={`flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-white pb-2 shadow-[0_0_4px_0_rgba(0,0,0,0.10)] ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* 장소 (클릭 시 상세 이동) */}
      <button
        type="button"
        onClick={handlePlaceClick}
        className="flex w-full flex-col items-start rounded-t-2xl border-b border-gray-20 px-6 py-2 text-left hover:bg-gray-10"
      >
        <p className="text-heading-md text-black">{title}</p>
        <p className="text-body-xs text-gray-40">{subTitle}</p>
      </button>

      {/* 제보 내용 영역 */}
      <div className="flex w-full flex-col gap-2">
        {/* 제보 맨 위(프로필) */}
        <div className="flex w-full items-center justify-between pr-1 pl-3">
          <div className="flex items-center gap-2">
            <div className="h-5.5 w-5.5 rounded-full bg-gray-20" />
            <div className="flex items-center gap-2">
              <p className="text-body-bold-sm text-black">{userName}</p>
              <span className="text-caption-md text-gray-60">
                {formattedDate}
              </span>
            </div>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={handleMenuClick}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-10"
            >
              <MoreIcon />
            </button>

            {openMenu && (
              <button
                type="button"
                onClick={handleClickDelete}
                className="absolute top-full right-0 z-10 mt-1 flex w-15 items-center justify-center rounded-lg border border-gray-40 bg-white p-2 text-caption-md text-black shadow-[0_0_10px_0_rgba(0,0,0,0.10)] hover:bg-gray-10"
              >
                삭제하기
              </button>
            )}
          </div>
        </div>

        {/* 제보 텍스트 */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onReviewDetailClick?.();
          }}
          className="flex w-full items-center justify-center gap-2 px-[1.72rem] text-left"
        >
          <p className="w-full text-body-sm whitespace-pre-wrap text-black">
            {reviewText}
          </p>
        </button>

        {/* 좋아요/댓글 */}
        <div className="flex w-full items-center gap-2 px-3 pt-1 pb-2">
          <button
            type="button"
            onClick={handleLikeClick}
            className={`flex items-center gap-2.5 rounded-20 border px-2.5 py-[2.5px] transition-colors duration-200 ${
              isLiked
                ? 'border-neon-100 text-neon-100'
                : 'border-gray-20 bg-white text-gray-80'
            }`}
          >
            {isLiked ? <ThumbsUpIcon /> : <ThumbsUpGrayIcon />}
            <span>추천 {likes}</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReviewDetailClick?.();
            }}
            className="flex items-center gap-2.5 rounded-20 border border-gray-20 px-2.5 py-[2.5px] text-gray-80 hover:bg-gray-10"
          >
            <ChatIcon />
            <span>댓글 {commentCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
