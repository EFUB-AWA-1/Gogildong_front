import axiosInstance from "@/common/api/axiosInstance";

// API 응답 타입 정의
export interface PostReviewResponse {
  userId: number;
  userName: string;
  reviewId: number;
  reviewText: string;
  createdAt: string;
  updatedAt: string;
}

export const postReview = async (facilityId: number, reviewText: string) => {
  const { data } = await axiosInstance.post<PostReviewResponse>(`/reviews`, {
    facilityId,
    reviewText
  });
  return data;
};