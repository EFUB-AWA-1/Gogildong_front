import ReviewCard from './ReviewCard';
import type { Review } from '../types/review';

interface ReviewListProps {
  reviews: Review[];
  total?: number;
}

export default function ReviewList({ reviews, total }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="rounded-xl border border-gray-20 bg-gray-10 py-8 text-center text-body-md text-gray-60">
        아직 등록된 리뷰가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-heading-sm">
        리뷰 <span className="text-neon-100">{total}</span>
      </p>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.reviewId} review={review} />
        ))}
      </div>
    </div>
  );
}
