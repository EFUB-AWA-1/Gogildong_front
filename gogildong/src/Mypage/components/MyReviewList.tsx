import MypageDialog from '@/Mypage/components/MypageDialog';
import ReviewItem from '@/Mypage/components/ReviewItem';
import { useState } from 'react';
import type { Review } from '@/FacilityView/types/review';
import { useNavigate } from 'react-router-dom';

export default function MyReviewList() {
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

  const [reviews, setReviews] = useState<Review[]>([
    {
      reviewId: 1,
      userName: '불멸의 이순신',
      reviewText: '여기 화장실 수압이 약해서 물이 잘 안 내려가요.\n참고하세요.',
      likeCount: 3,
      commentCount: 1,
      createdAt: '2025-09-21',
      likedByUser: false,
      userId: 1
    },
    {
      reviewId: 2,
      userName: '홍길동',
      reviewText: '칸이 좁고 휴지가 자주 없어요.',
      likeCount: 0,
      commentCount: 0,
      createdAt: '2025-09-20',
      likedByUser: false,
      userId: 1
    }
  ]);

  const handleOpenDialog = (reviewId: number) => {
    setSelectedReviewId(reviewId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReviewId(null);
  };

  const handleDeleteReview = async () => {
    if (!selectedReviewId) return;

    // TODO: 리뷰 삭제 API 연결
    // await deleteMyReview(selectedReviewId);

    setReviews((prev) => prev.filter((r) => r.reviewId !== selectedReviewId));

    setOpenDialog(false);
    setSelectedReviewId(null);
  };

  // 장소 상세 이동 (id는 실제 facility id로 교체 필요)
  const handleGoFacilityDetail = (facilityId: number) => {
    navigate(`/school/facility/${facilityId}`);
  };

  const handleGoReviewDetail = (review: Review) => {
    navigate('/school/view/review', {
      state: { review }
    });
  };

  return (
    <>
      <div className="mb-20 px-4">
        <div className="mx-auto flex max-w-[480px] flex-col gap-4">
          {reviews.map((review) => (
            <ReviewItem
              key={review.reviewId}
              review={review}
              title="2-A"
              subTitle="본관 2층 | 교무실 앞 (2025-09-21 기준)"
              onDelete={handleOpenDialog}
              onPlaceClick={() => handleGoFacilityDetail(1)} // TODO: 실제 시설 id로 교체
              onReviewDetailClick={() => handleGoReviewDetail(review)}
            />
          ))}
        </div>
      </div>

      <MypageDialog
        open={openDialog}
        title="리뷰 삭제"
        message="등록된 리뷰를 삭제하시겠습니까?"
        cancelLabel="취소"
        confirmLabel="삭제하기"
        onClose={handleCloseDialog}
        onConfirm={handleDeleteReview}
      />
    </>
  );
}
