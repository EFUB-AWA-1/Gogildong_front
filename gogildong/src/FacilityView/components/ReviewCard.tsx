import ChatIcon from '@/FacilityView/assets/svgs/chat.svg?react';
import ThumbsUpIcon from '@/FacilityView/assets/svgs/icon_thumb.svg?react';
import MoreIcon from '@/FacilityView/assets/svgs/three_dots_vertical.svg?react';
import type { Review } from '../types/review';
import { useState } from 'react';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { userName, reviewText, likeCount, commentCount, createdAt } = review;

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(likeCount);

  // ✅ 추천 버튼 클릭 핸들러
  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const formattedDate = createdAt
    ? new Date(createdAt).toISOString().split('T')[0]
    : '2025-09-21';

  return (
    <div className="rounded-2xl border border-gray-20 bg-white p-4 shadow-sm">
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
        <MoreIcon />
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
