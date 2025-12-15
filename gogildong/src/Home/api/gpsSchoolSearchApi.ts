import axiosInstance from "@/common/api/axiosInstance";
import type { NearbySchoolResponse } from "../types/school-nearby";

// API 파라미터 타입 정의
type GetNearbySchoolsParams = {
  lat?: number;
  lng?: number;
  tag?: string;
  radius?: number;
  page?: number;
  size?: number;
};

export const getNearbySchools = async (params: GetNearbySchoolsParams) => {
  // GET /schools/nearby
  const { data } = await axiosInstance.get<NearbySchoolResponse>(
    "/schools/nearby",
    {
      params,
    }
  );
  return data;
};