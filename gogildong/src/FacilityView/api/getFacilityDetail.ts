import axiosInstance from "@/common/api/axiosInstance";
import type { FacilityInfo } from "../types/facility";

export const getFacilityDetail = async (facilityId: number) => {
  
    // /facilities/{facility_id}
  const { data } = await axiosInstance.get<FacilityInfo>(
    `/facilities/${facilityId}`
  );
  return data;
};