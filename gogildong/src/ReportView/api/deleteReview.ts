import axiosInstance from "@/common/api/axiosInstance";

// 리뷰 삭제 API
export const deleteReview = async (reviewId: number) => {
  // DELETE /reviews/{review_id}
  const { data } = await axiosInstance.delete(`/reviews/${reviewId}`);
  return data;
};