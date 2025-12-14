import axiosInstance from "@/common/api/axiosInstance";

export const reportReview = async (reviewId: number) => {
  // POST /reviews/{review_id}/flag
  const { data } = await axiosInstance.post(`/reviews/${reviewId}/flag`);
  return data;
};