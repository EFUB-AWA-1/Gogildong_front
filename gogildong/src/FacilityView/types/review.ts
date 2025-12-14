export interface Review {
  userId: number;
  userName: string;
  reviewId: number;
  reviewText: string;
  likedByUser: boolean; 
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export interface ReviewResponse {
  total: number;
  reviewSummary?: string;
  reviews: Review[];
  last: boolean;
}