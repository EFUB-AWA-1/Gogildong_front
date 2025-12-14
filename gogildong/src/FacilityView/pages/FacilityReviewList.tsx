import Header from '@/common/components/Header';
import ReviewCard from '@/FacilityView/components/ReviewCard';
import type { Review } from '@/FacilityView/types/review';
import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '@/Mypage/stores/useUserStore';
import { getFacilityReviews } from '@/FacilityView/api/getFacilityReviews';

type LocationState = {
  reviews?: Review[];
  total?: number;
  facilityName?: string;
  buildingName?: string;
  aiSummary?: string[];
};

export default function FacilityReviewList() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const [reviewList, setReviewList] = useState<Review[]>(
    state.reviews && state.reviews.length > 0 ? state.reviews : []
  );

  const [aiSummary, setAiSummary] = useState<string[]>(
    state.aiSummary && state.aiSummary.length > 0 ? state.aiSummary : []
  );

  const user = useUserStore((state) => state.user);
  const currentUserId = user?.userId;

  const total = reviewList.length;

  const facilityName = useMemo(
    () => state.facilityName ?? id ?? '1-A',
    [state.facilityName, id]
  );
  const buildingName = state.buildingName ?? '본관';

  useEffect(() => {
    const fetchLatestReviews = async () => {
      if (!id) return;
      try {
        const response = await getFacilityReviews(Number(id));
        if (response) {
          if (response.reviews) setReviewList(response.reviews);
          if (response.reviewSummary) setAiSummary([response.reviewSummary]);
        }
      } catch (error) {
        console.error("리뷰 목록 갱신 실패:", error);
      }
    };
    fetchLatestReviews();
  }, [id, location.key]); 

  const handleBack = () => navigate(-1);

  const handleWriteClick = () => {
    navigate('/school/view/review/write', {
      state: { facilityId: id, facilityName, buildingName }
    });
  };

  const handleReviewClick = (review: Review) => {
    navigate('/school/view/review', {
      state: { review } 
    });
  };

  const handleDeleteReview = (deletedReviewId: number) => {
    setReviewList((prev) => prev.filter((r) => r.reviewId !== deletedReviewId));
  };

  const sortedReviewList = [...reviewList].sort((a, b) => {
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <div className="flex h-full flex-col">
      <Header title={facilityName} onBackClick={handleBack} />

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pt-3 pb-[92px]">
        <section className="rounded-2xl border border-gray-20 bg-white p-4">
          <h2 className="text-heading-sm text-black">AI 분석 요약</h2>
          <div className="mt-2 flex flex-col gap-1">
            {aiSummary.length > 0 ? (
              aiSummary.map((item, index) => (
                <p key={index} className="text-body-sm text-black leading-150 break-keep whitespace-pre-wrap">
                  {item}
                </p>
              ))
            ) : (
              <p className="text-body-sm text-gray-60">분석된 요약이 없습니다.</p>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-heading-sm text-black">
            리뷰 <span className="text-neon-100">{total}</span>
          </h2>
          <div className="flex flex-col gap-3">
            {sortedReviewList.length > 0 ? (
              sortedReviewList.map((review) => (
                <ReviewCard
                  key={review.reviewId}
                  review={review}
                  isMine={review.userId === currentUserId}
                  onDelete={handleDeleteReview}
                  onClick={() => handleReviewClick(review)}
                />
              ))
            ) : (
              <div className="py-10 text-center text-body-md text-gray-60">
                아직 등록된 리뷰가 없습니다.
              </div>
            )}
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