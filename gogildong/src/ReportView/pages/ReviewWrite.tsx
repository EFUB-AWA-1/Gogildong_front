import Header from "@/common/components/Header";
import ReviewLocation from "../components/ReviewLocation";
import ReviewForm from "../components/ReviewForm";
import ActionButton from "@/common/components/ActionButton";
import { useMemo, useState } from "react";
import ReviewGuidelines from "../components/ReviewGuidelines";
import DoubleBtnModal from "../components/modals/DoubleBtnModal";
import { useLocation, useNavigate } from "react-router-dom";

import { postReview } from "@/ReportView/api/postReview";

type ModalType = "leave" | "submit" | null;

type LocationState = {
  facilityId?: string | number;
  facilityName?: string;
  buildingName?: string;
};

export default function ReviewWrite() {
  const [review, setReview] = useState("");
  const [modalType, setModalType] = useState<ModalType>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const facilityId = state.facilityId; 
  const facilityName = state.facilityName || "시설 정보 없음";
  const buildingName = state.buildingName || "건물 정보 없음";

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

  const handleSubmitClick = () => {
    if (!isValid) return;
    if (hasContent) {
      setModalType("submit");
      return;
    }
  };

  const submitReview = async () => {
    if (!facilityId) {
      alert("시설 정보를 찾을 수 없습니다.");
      setModalType(null);
      return;
    }

    try {
      const responseData = await postReview(Number(facilityId), review);

      // 성공 후 상세 페이지로 이동
      navigate("/school/view/review", {
        state: {
          fromWrite: true,
          reviewId: responseData.reviewId,
          reviewData: responseData, // API 응답 데이터 전달
        }
      });

    } catch (error) {
      console.error('API Error:', error);
      // axios 에러 처리 (필요시)
      alert('리뷰 등록 중 오류가 발생했습니다.');
    } finally {
      setModalType(null);
    }
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

      <div className="overflow-y-auto w-full">
        <ReviewLocation 
          facilityName={facilityName} 
          buildingName={buildingName} 
        />
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