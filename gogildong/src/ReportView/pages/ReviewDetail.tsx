import Header from "@/common/components/Header";
import CommentInput from "../components/ReviewDetail/CommentInput";
import ReviewCard from "../components/ReviewDetail/ReviewCard"; // 경로 확인 필요
import CommentsList from "../components/ReviewDetail/CommentsList";
import type { Comment } from "../types/reviewComment";
import type { Review } from "@/FacilityView/types/review";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SingleBtnModal from "../components/modals/SingleBtnModal";
import { useUserStore } from "@/Mypage/stores/useUserStore";

type LocationState = {
  fromWrite?: boolean;
  review?: Review;
  reviewData?: Review;
};

export default function ReviewDetail() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [openCompleteModal, setOpenCompleteModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as LocationState;
  const user = useUserStore((state) => state.user);
  const currentReview = state.review || state.reviewData;
  const currentUserId = user?.userId;

  useEffect(() => {
    if (state.fromWrite) {
      setOpenCompleteModal(true);
      navigate(location.pathname, {
        replace: true,
        state: { ...state, fromWrite: false }
      });
    }
  }, [state.fromWrite, navigate, location.pathname, state]);

  // 상세 페이지에서 삭제 성공 시 뒤로가기
  const handleDeleteSuccess = () => {
    alert("리뷰가 삭제되었습니다.");
    navigate(-1);
  };

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
        {currentReview ? (
          <ReviewCard
            review={currentReview}
            isMine={currentReview.userId === currentUserId}
            onDelete={handleDeleteSuccess}
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
        message={"5포인트가 적립되었습니다. \n마이페이지에서 확인할 수 있습니다."}
        label="확인"
        onClose={() => setOpenCompleteModal(false)}
        onConfirm={() => setOpenCompleteModal(false)}
      />
    </div>
  );
}