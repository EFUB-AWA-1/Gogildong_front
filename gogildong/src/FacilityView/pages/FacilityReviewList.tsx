import Header from '@/common/components/Header';
import ReviewCard from '@/FacilityView/components/ReviewCard';
import type { Review } from '@/FacilityView/types/review';
import { useMemo, useState, useEffect } from 'react'; // 
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '@/Mypage/stores/useUserStore';
import { getFacilityReviews } from '@/FacilityView/api/getFacilityReviews';


const mockAiSummary = ['🚧좁음', '🧼청결함', '😃긍정적', '♿이동편의'];

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
    state.reviews && state.reviews.length > 0 ? state.reviews : ([])
  );

  const user = useUserStore((state) => state.user);
  const currentUserId = user?.userId;

  const aiSummary =
    state.aiSummary && state.aiSummary.length > 0
      ? state.aiSummary
      : mockAiSummary;
      
  const total = reviewList.length;

  const facilityName = useMemo(
    () => state.facilityName ?? id ?? '1-A',
    [state.facilityName, id]
  );
  const buildingName = state.buildingName ?? '본관';

  // 화면에 진입할 때마다 최신 데이터 불러오기
  useEffect(() => {
    const fetchLatestReviews = async () => {
      if (!id) return;
      try {
        const response = await getFacilityReviews(Number(id));
        
        if (response && response.reviews) {
            setReviewList(response.reviews);
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

  // 상세 페이지 이동
  const handleReviewClick = (review: Review) => {
    navigate('/school/view/review', {
      state: { review } // 전체 객체 전달
    });
  };

  // 리스트에서 바로 삭제했을 때의 갱신 처리
  const handleDeleteReview = (deletedReviewId: number) => {
    setReviewList((prev) => prev.filter((r) => r.reviewId !== deletedReviewId));
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
            {reviewList.map((review) => (
              <ReviewCard
                key={review.reviewId}
                review={review}
                isMine={review.userId === currentUserId}
                onDelete={handleDeleteReview}
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