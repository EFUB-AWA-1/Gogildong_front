import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/Mypage/stores/useUserStore';
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
  
  // ★ 내 글 확인을 위해 user store 사용
  const user = useUserStore((state) => state.user);
  const currentUserId = user?.userId;

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

  // 날짜 정렬 (오래된 순)
  const sortedReviews = [...reviews].sort((a, b) => {
    if (!a.createdAt) return 1; 
    if (!b.createdAt) return -1;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const visibleReviews =
    sortedReviews.length > MIN_REVIEWS_FOR_MORE
      ? sortedReviews.slice(0, MIN_REVIEWS_FOR_MORE)
      : sortedReviews;

  const shouldShowMoreButton = displayTotal > 0;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-heading-sm">
        리뷰 <span className="text-neon-100">{displayTotal}</span>
      </p>
      <div className="flex flex-col items-center gap-3">
        <div className="flex w-full flex-col gap-4">
          {visibleReviews.map((review) => (
            <ReviewCard 
                key={review.reviewId} 
                review={review}
                // ★ isMine을 여기서 계산해서 전달
                isMine={review.userId === currentUserId}
            />
          ))}
        </div>
        
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