import axiosInstance from "@/common/api/axiosInstance";

// 좋아요 등록
export const postReviewLike = async (reviewId: number) => {
  const { data } = await axiosInstance.post(`/reviews/${reviewId}/likes`);
  return data;
};

// 좋아요 취소
export const deleteReviewLike = async (reviewId: number) => {
  const { data } = await axiosInstance.delete(`/reviews/${reviewId}/likes`);
  return data;
};