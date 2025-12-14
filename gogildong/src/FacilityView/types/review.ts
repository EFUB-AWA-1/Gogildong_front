export interface Review {
  userId: number;
  userName: string;
  reviewId: number;
  reviewText: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export interface ReviewResponse {
  total: number;
  reviewSummary?: string;
  last: boolean;
  reviews: Review[];
}
