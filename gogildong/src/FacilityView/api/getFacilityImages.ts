import axiosInstance from "@/common/api/axiosInstance";
import type { FacilityImageResponse } from "../types/facilityImage";

export const getFacilityImages = async (facilityId: number) => {
  const { data } = await axiosInstance.get<FacilityImageResponse>(
    `/facilities/${facilityId}/images`
  );
  return data;
};