import Header from "@/common/components/Header";
import CommentInput from "../components/ReviewDetail/CommentInput";
import ReviewCard from "../components/ReviewDetail/ReviewCard";
import CommentsList from "../components/ReviewDetail/CommentsList";
import type { Comment } from "../types/reviewComment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SingleBtnModal from "../components/modals/SingleBtnModal";

const dummyComments: Comment[] = [
  {
    commentId: 1,
    userId: 1,
    userName: "카우룽카우룽",
    date: "2025-10-21",
    commentText: "이거 얼마 전에 고쳐졌어요댓글길어진다안녕하세요저는이퍼비에요"
  },
  {
    commentId: 2,
    userId: 2,
    userName: "가을은가을이네",
    date: "2025-10-30",
    commentText: "다시 안 내려가기 시작했어요"
  }
];

type LocationState = {
  fromWrite?: boolean;
};

export default function ReviewDetail() {
  const [comments, setComments] = useState<Comment[]>(dummyComments);
  const [openCompleteModal, setOpenCompleteModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as LocationState;

  useEffect(() => {
    if (state.fromWrite) {
      setOpenCompleteModal(true);

      navigate(location.pathname, {
        replace: true,
        state: {}
      });
    }
  }, [state.fromWrite, navigate, location.pathname]);

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      commentId: Date.now(), // 임시 id
      userId: 0, // TODO: 로그인 붙으면 실제 userId 사용
      userName: "닉네임", // TODO: 실제 사용자 닉네임으로 변경
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      commentText: text
    };

    setComments((prev) => [...prev, newComment]);
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Header title="댓글" />
      <div className="flex h-full w-full flex-col">
        <ReviewCard />
        <CommentsList comments={comments} />
      </div>
      <div className="fixed bottom-[env(safe-area-inset-bottom)] left-1/2 z-10 w-full max-w-[480px] -translate-x-1/2">
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
