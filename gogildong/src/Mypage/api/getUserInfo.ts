import axiosInstance from "@/common/api/axiosInstance";
import { useUserStore } from "../stores/useUserStore";

export const getUserInfo = async () => {
  const { data } = await axiosInstance.get("/users/me");
  useUserStore.getState().setUser(data);
  return data;
};
