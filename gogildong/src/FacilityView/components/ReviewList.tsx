import { useNavigate } from 'react-router-dom';

import ReviewCard from './ReviewCard';
import type { Review } from '../types/review';

interface ReviewListProps {
  reviews: Review[];
  total?: number;
  facilityId?: number | string;
  facilityName?: string;
  aiSummary?: string[];
}

export default function ReviewList({
  reviews,
  total,
  facilityId,
  facilityName,
  aiSummary
}: ReviewListProps) {
  const MIN_REVIEWS_FOR_MORE = 3;
  const navigate = useNavigate();
  const displayTotal = total ?? reviews.length;

  const handleNavigateMore = () => {
    navigate(
      facilityId ? `/school/facility/${facilityId}/reviews` : '/school/view/review',
      {
        state: {
          reviews,
          total: displayTotal,
          facilityName,
          aiSummary
        }
      }
    );
  };

  // 리뷰가 0개일 때도 작성하러 가기 버튼을 보여줌
  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <div className="rounded-xl border border-gray-20 bg-gray-10 py-8 text-center text-body-md text-gray-60">
          아직 등록된 리뷰가 없습니다.
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="w-fit rounded-[20px] border border-gray-20 bg-white px-2.5 py-[5px] text-caption-md text-black"
            onClick={handleNavigateMore}
          >
            첫 리뷰 작성하기 &gt;
          </button>
        </div>
      </div>
    );
  }

  // 3개가 넘어가면 자르고, 아니면 다 보여줌
  const visibleReviews =
    reviews.length > MIN_REVIEWS_FOR_MORE
      ? reviews.slice(0, MIN_REVIEWS_FOR_MORE)
      : reviews;


  const shouldShowMoreButton = displayTotal > 0;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-heading-sm">
        리뷰 <span className="text-neon-100">{displayTotal}</span>
      </p>
      <div className="flex flex-col items-center gap-3">
        <div className="flex w-full flex-col gap-4">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.reviewId} review={review} />
          ))}
        </div>
        
        {/* 버튼이 항상 보입니다 (리뷰가 있다면) */}
        {shouldShowMoreButton && (
          <button
            type="button"
            className="w-fit rounded-[20px] border border-gray-20 bg-white px-2.5 py-[5px] text-caption-md text-black"
            onClick={handleNavigateMore}
          >
            {reviews.length > MIN_REVIEWS_FOR_MORE 
              ? `더보기 (+${displayTotal - MIN_REVIEWS_FOR_MORE}) >` 
              : `전체보기 / 작성 >` 
            }
          </button>
        )}
      </div>
    </div>
  );
}