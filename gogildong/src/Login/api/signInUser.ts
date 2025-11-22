import axiosInstance from "@/common/api/axiosInstance";

interface SignInRequest {
  loginId: string;
  password: string;
}
export const signInUser = async (payload: SignInRequest) => {
  const { data } = await axiosInstance.post("/auth/login", payload);
  return data;
};
