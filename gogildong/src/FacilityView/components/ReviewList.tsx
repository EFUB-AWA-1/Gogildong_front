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

  if (!reviews || reviews.length === 0) {
    return (
      <div className="rounded-xl border border-gray-20 bg-gray-10 py-8 text-center text-body-md text-gray-60">
        아직 등록된 리뷰가 없습니다.
      </div>
    );
  }

  const hasMoreThanPreview =
    displayTotal > MIN_REVIEWS_FOR_MORE ||
    reviews.length > MIN_REVIEWS_FOR_MORE;
  const shouldShowMoreButton = hasMoreThanPreview;
  const visibleReviews =
    hasMoreThanPreview && reviews.length > MIN_REVIEWS_FOR_MORE
      ? reviews.slice(0, MIN_REVIEWS_FOR_MORE)
      : reviews;

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
        {shouldShowMoreButton && (
          <button
            type="button"
            className="bg-whte w-fit rounded-[20px] border border-gray-20 bg-white px-2.5 py-[5px] text-caption-md text-black"
            onClick={handleNavigateMore}
          >
            더보기 &gt;
          </button>
        )}
      </div>
    </div>
  );
}
