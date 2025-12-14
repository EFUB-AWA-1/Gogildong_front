import axiosInstance from "@/common/api/axiosInstance";
import type { Review } from "@/FacilityView/types/review";

export interface CommentResponse {
  total: number;
  review: Review;
  reviewComments: Array<{
    commentId: number;
    userId: number;
    userName: string;
    commentText: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

// 1. 댓글 목록 조회
export const getComments = async (reviewId: number) => {
  const { data } = await axiosInstance.get<CommentResponse>(`/reviews/${reviewId}/comments`);
  return data;
};

// 2. 댓글 작성
export const postComment = async (reviewId: number, commentText: string) => {
  const { data } = await axiosInstance.post(`/reviews/${reviewId}/comments`, {
    commentText,
  });
  return data;
};

// 3. 댓글 삭제
export const deleteComment = async (reviewId: number, commentId: number) => {
  const { data } = await axiosInstance.delete(`/reviews/${reviewId}/comments/${commentId}`);
  return data;
};

// 4. 댓글 신고
export const reportComment = async (reviewId: number, commentId: number) => {
  const { data } = await axiosInstance.post(`/reviews/${reviewId}/comments/${commentId}/flag`);
  return data;
};