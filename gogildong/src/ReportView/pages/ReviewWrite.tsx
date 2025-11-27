import Header from "@/common/components/Header";
import ReviewLocation from "../components/ReviewLocation";
import ReviewForm from "../components/ReviewForm";
import ActionButton from "@/common/components/ActionButton";
import { useMemo, useState } from "react";
import ReviewGuidelines from "../components/ReviewGuidelines";
import DoubleBtnModal from "../components/modals/DoubleBtnModal";
import { useNavigate } from "react-router-dom";

type ModalType = "leave" | "submit" | null;

export default function ReviewWrite() {
  const [review, setReview] = useState("");
  const [modalType, setModalType] = useState<ModalType>(null);
  const navigate = useNavigate();

  const isValid = useMemo(() => {
    const len = review.trim().length;
    return len >= 15 && len <= 500;
  }, [review]);

  const hasContent = review.trim().length > 0;

  const handleBack = () => {
    if (hasContent) {
      setModalType("leave");
      return;
    }
    navigate(-1);
  };

  //하단 제출 액션 버튼 클릭 시
  const handleSubmitClick = () => {
    if (!isValid) return;
    if (hasContent) {
      setModalType("submit");
      return;
    }
  };

  //실제 모달에서 제출 버튼 누를 시 (진짜 제출)
  const submitReview = () => {
    // TODO: API 호출
    // 성공 후 이동 등 처리
    navigate("/school/view/review", {
      //경로 수정 필요
      state: {
        fromWrite: true // 작성 페이지에서 넘어왔다는 표시
        // reviewId: newReviewId, // 나중에 상세 페이지에서 사용할 id
      }
    });
  };

  const closeModal = () => setModalType(null);

  const handleConfirm = () => {
    if (modalType === "leave") {
      navigate(-1);
      return;
    }
    if (modalType === "submit") {
      submitReview();
      return;
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Header title="리뷰 작성" onBackClick={handleBack} />

      <div className="overflow-y-auto">
        <ReviewLocation />
        <ReviewForm review={review} setReview={setReview} />
        <ReviewGuidelines />
      </div>
      <div className="sticky bottom-0 w-full max-w-[480px] bg-white p-4">
        <ActionButton
          label="작성 완료"
          onClick={handleSubmitClick}
          disabled={!isValid}
        />
      </div>

      <DoubleBtnModal
        open={modalType !== null}
        title={
          modalType === "leave"
            ? "리뷰 작성을 취소할까요?"
            : "리뷰를 등록할까요?"
        }
        label="확인"
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
