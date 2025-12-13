import axiosInstance from "@/common/api/axiosInstance";
import type { ReviewResponse } from "../types/review";

export const getFacilityReviews = async (facilityId: number) => {
  const { data } = await axiosInstance.get<ReviewResponse>(
    `/reviews/${facilityId}`
  );
  return data;
};