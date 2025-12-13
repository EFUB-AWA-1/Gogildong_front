import Header from "@/common/components/Header";
import CommentInput from "../components/ReviewDetail/CommentInput";
import ReviewCard from "../components/ReviewDetail/ReviewCard";
import CommentsList from "../components/ReviewDetail/CommentsList";
import type { Comment } from "../types/reviewComment";
import type { Review } from "@/FacilityView/types/review";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SingleBtnModal from "../components/modals/SingleBtnModal";


type LocationState = {
  fromWrite?: boolean;
  review?: Review; // 이전 페이지(목록)에서 넘어온 리뷰 데이터
  reviewData?: Review; // 작성 페이지에서 넘어온 리뷰 데이터
};

export default function ReviewDetail() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [openCompleteModal, setOpenCompleteModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as LocationState;

  // 1. 넘어온 데이터 확인
  const currentReview = state.review || state.reviewData;

  useEffect(() => {
    if (state.fromWrite) {
      setOpenCompleteModal(true);
      // 새로고침 시 모달 뜨지 않도록 state 정리
      navigate(location.pathname, {
        replace: true,
        state: { ...state, fromWrite: false }
      });
    }
  }, [state.fromWrite, navigate, location.pathname, state]);

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      commentId: Date.now(),
      userId: 0,
      userName: "내 닉네임",
      date: new Date().toISOString().slice(0, 10),
      commentText: text
    };
    setComments((prev) => [...prev, newComment]);
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Header title="댓글" onBackClick={handleBack} />

      <div className="flex h-full w-full flex-col overflow-y-auto pb-[80px]">
        {/*  Review 타입을 ReviewCard가 원하는 props 형태로 변환하여 전달 */}
        {currentReview ? (
          <ReviewCard
            review={{
              id: currentReview.reviewId,
              nickname: currentReview.userName,
              
              // createdAt이 존재하면 T를 기준으로 자르거나 앞 10자리만 사용하여 YYYY-MM-DD 포맷팅
              date: currentReview.createdAt 
                ? currentReview.createdAt.split('T')[0] 
                : new Date().toISOString().slice(0, 10),
                
              content: currentReview.reviewText,
              likeCount: currentReview.likeCount || 0,
              isLiked: false, 
            }}
          />
        ) : (
          <div className="p-8 text-center text-gray-40">
            리뷰 정보를 불러올 수 없습니다.
          </div>
        )}

        <CommentsList comments={comments} />
      </div>

      <div className="fixed bottom-[env(safe-area-inset-bottom)] left-1/2 z-10 w-full max-w-[480px] -translate-x-1/2 bg-white p-4 border-t border-gray-10">
        <CommentInput onSubmit={handleAddComment} />
      </div>

      <SingleBtnModal
        open={openCompleteModal}
        title="리뷰 작성 완료"
        message={
          "5포인트가 적립되었습니다. \n마이페이지에서 확인할 수 있습니다."
        }
        label="확인"
        onClose={() => setOpenCompleteModal(false)}
        onConfirm={() => setOpenCompleteModal(false)}
      />
    </div>
  );
}