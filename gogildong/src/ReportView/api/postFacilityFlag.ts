import axiosInstance from "@/common/api/axiosInstance";

export const postFacilityFlag = async (
  facilityId: number, 
  reportId: number, 
  reason: string
) => {
  const { data } = await axiosInstance.post(`/facilities/${facilityId}/flag`, {
    reportId,
    reason
  });
  return data;
};