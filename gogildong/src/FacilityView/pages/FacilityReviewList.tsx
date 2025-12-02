import Header from '@/common/components/Header';
import ReviewCard from '@/FacilityView/components/ReviewCard';
import type { Review } from '@/FacilityView/types/review';
import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const mockReviews: Review[] = [
  {
    userId: 1,
    userName: '불멸의 이순신',
    reviewId: 23,
    reviewText:
      '입구에 택배가 비치되어 있어 진입 시 폭이 좁다고 느껴진다. 경사로 없이 턱이 존재한다.',
    likeCount: 3,
    commentCount: 1,
    createdAt: '2025-09-21'
  },
  {
    userId: 2,
    userName: '닉네임',
    reviewId: 24,
    reviewText: '화장실 칸 폭이 넓어서 편해요.',
    likeCount: 0,
    commentCount: 1,
    createdAt: '2025-09-21'
  },
  {
    userId: 3,
    userName: '닉네임',
    reviewId: 25,
    reviewText: '화장실 칸 폭이 넓어서 편해요.',
    likeCount: 0,
    commentCount: 1,
    createdAt: '2025-09-21'
  },
  {
    userId: 4,
    userName: '닉네임',
    reviewId: 26,
    reviewText: '화장실 칸 폭이 넓어서 편해요.',
    likeCount: 0,
    commentCount: 1,
    createdAt: '2025-09-21'
  },
  {
    userId: 5,
    userName: '닉네임',
    reviewId: 27,
    reviewText: '화장실 칸 폭이 넓어서 편해요.',
    likeCount: 0,
    commentCount: 1,
    createdAt: '2025-09-21'
  }
];

const mockAiSummary = ['🚧좁음', '🧼청결함', '😃긍정적', '♿이동편의'];

type LocationState = {
  reviews?: Review[];
  total?: number;
  facilityName?: string;
  aiSummary?: string[];
};

export default function FacilityReviewList() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const reviews =
    state.reviews && state.reviews.length > 0 ? state.reviews : mockReviews;
  const aiSummary =
    state.aiSummary && state.aiSummary.length > 0 ? state.aiSummary : mockAiSummary;
  const total = state.total ?? reviews.length;
  const facilityName = useMemo(
    () => state.facilityName ?? id ?? '1-A',
    [state.facilityName, id]
  );

  const handleBack = () => navigate(-1);
  const handleWriteClick = () => navigate('/school/view/review/write');

  const handleReviewClick = (review: Review) => {
    navigate('/school/view/review', { state: { reviewId: review.reviewId } });
  };

  return (
    <div className="flex h-full flex-col">
      <Header title={facilityName} onBackClick={handleBack} />

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pt-3 pb-[92px]">
        <section className="rounded-2xl border border-gray-20 bg-white p-4">
          <h2 className="text-heading-sm text-black">AI 분석 요약</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {aiSummary.map((item) => (
              <span
                key={item}
                className="border-gray-30 bg-gray-05 rounded-full border px-3 py-1 text-body-sm text-gray-80"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-heading-sm text-black">
            리뷰 <span className="text-neon-100">{total}</span>
          </h2>
          <div className="flex flex-col gap-3">
            {reviews.map((review) => (
              <ReviewCard
                key={review.reviewId}
                review={review}
                onClick={() => handleReviewClick(review)}
              />
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-[env(safe-area-inset-bottom)] left-1/2 w-full max-w-[480px] -translate-x-1/2 bg-white px-4 pt-4 pb-6">
        <button
          type="button"
          className="text-body-bold-md w-full rounded-[14px] bg-neon-100 py-4 text-white"
          onClick={handleWriteClick}
        >
          리뷰 작성
        </button>
      </div>
    </div>
  );
}
