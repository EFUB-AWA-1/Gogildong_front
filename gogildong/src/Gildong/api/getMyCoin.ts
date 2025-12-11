import axiosInstance from "@/common/api/axiosInstance";

export const getMyCoin = async () => {
  const { data } = await axiosInstance.get("/coin/me");
  return data;
};
