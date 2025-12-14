import ChatIcon from '@/FacilityView/assets/svgs/chat.svg?react';
import ThumbsUpIcon from '@/FacilityView/assets/svgs/icon_thumb.svg?react';
import MoreIcon from '@/FacilityView/assets/svgs/three_dots_vertical.svg?react';
import type { Review } from '../types/review';
import { useState, useEffect, useRef } from 'react';

interface ReviewCardProps {
  review: Review;
  onClick?: () => void;
  isMine?: boolean;
  onDelete?: (deletedReviewId: number) => void;
}

export default function ReviewCard({ review, onClick, isMine = false, onDelete }: ReviewCardProps) {
  const { userName, reviewText, likeCount, commentCount, createdAt } = review;

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(likeCount);

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    if (openMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenu]);

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleMenuClick = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(review.reviewId);
    setOpenMenu(false);
  };

  const formattedDate = createdAt
    ? new Date(createdAt).toISOString().split('T')[0]
    : '2025-09-21';

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
          {isMine && (
            <>
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
                  onClick={handleDelete}
                  className="absolute top-full right-0 mt-1 flex w-16 items-center justify-center gap-2 rounded-md bg-white p-2 text-caption-md text-black shadow-md"
                >
                  삭제하기
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <p className="mt-2 text-body-md text-black">{reviewText}</p>

      <div className="mt-3 flex gap-2 text-body-sm">
        <button
          onClick={handleLikeClick}
          className={`flex items-center gap-2.5 rounded-[20px] border px-2.5 py-[2.5px] transition-colors duration-200 ${
            isLiked
              ? 'border-neon-100 bg-neon-15 text-neon-100'
              : 'border-gray-20 bg-white text-gray-80'
          }`}
        >
          <ThumbsUpIcon />
          <span>추천 {likes}</span>
        </button>
        <div className="flex items-center gap-2.5 rounded-[20px] border border-gray-20 px-2.5 py-[2.5px] text-gray-80">
          <ChatIcon />
          <span>댓글 {commentCount}</span>
        </div>
      </div>
    </div>
  );
}
