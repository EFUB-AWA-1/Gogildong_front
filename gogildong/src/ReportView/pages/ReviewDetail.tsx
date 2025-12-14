import Header from "@/common/components/Header";
import CommentInput from "../components/ReviewDetail/CommentInput";
import ReviewCard from "../components/ReviewDetail/ReviewCard";
import CommentsList from "../components/ReviewDetail/CommentsList";
import type { Comment } from "@/ReportView/types/reviewComment";
import type { Review } from "@/FacilityView/types/review";
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SingleBtnModal from "../components/modals/SingleBtnModal";
import { useUserStore } from "@/Mypage/stores/useUserStore";
import { getComments, postComment, deleteComment, reportComment } from "@/ReportView/api/commentApi";

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
  const currentUserId = user?.userId;

  const currentReview = state.review || state.reviewData;

  useEffect(() => {
    if (state.fromWrite) {
      setOpenCompleteModal(true);
      navigate(location.pathname, {
        replace: true,
        state: { ...state, fromWrite: false }
      });
    }
  }, [state.fromWrite, navigate, location.pathname, state]);

  // 댓글 목록 조회
  const fetchComments = useCallback(async () => {
    if (!currentReview?.reviewId) return;
    try {
      const data = await getComments(currentReview.reviewId);
      const mappedComments: Comment[] = data.reviewComments.map((item) => ({
        commentId: item.commentId,
        userId: item.userId,
        userName: item.userName,
        date: item.createdAt ? item.createdAt.split("T")[0] : "",
        commentText: item.commentText,
      }));
      setComments(mappedComments);
    } catch (error) {
      console.error("댓글 조회 실패:", error);
    }
  }, [currentReview?.reviewId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleReviewDeleteSuccess = () => {
    alert("리뷰가 삭제되었습니다.");
    navigate(-1);
  };

  const handleAddComment = async (text: string) => {
    if (!currentReview?.reviewId) return;
    try {
      await postComment(currentReview.reviewId, text);
      await fetchComments();
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!currentReview?.reviewId) return;
    try {
      await deleteComment(currentReview.reviewId, commentId);
      await fetchComments();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  // 댓글 신고 
  const handleReportComment = async (commentId: number) => {
    if (!currentReview?.reviewId) return;
    try {
      await reportComment(currentReview.reviewId, commentId);
      console.log(`댓글 신고 성공: ${commentId}`);
      fetchComments();
    } catch (error) {
      console.error("댓글 신고 실패:", error);
    }
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
            onDelete={handleReviewDeleteSuccess}
          />
        ) : (
          <div className="p-8 text-center text-gray-40">
            리뷰 정보를 불러올 수 없습니다.
          </div>
        )}

        {/* onReport 전달 */}
        <CommentsList 
          comments={comments} 
          currentUserId={currentUserId}
          onDelete={handleDeleteComment}
          onReport={handleReportComment} 
        />
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