import axiosInstance from "@/common/api/axiosInstance"

export const logout = async () => {
    await axiosInstance.post("/auth/logout");
}