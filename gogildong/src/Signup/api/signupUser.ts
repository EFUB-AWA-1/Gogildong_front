import axiosInstance from "@/common/api/axiosInstance";

export interface SignupBaseRequest {
  loginId: string;
  password: string;
  username: string;
  email: string;
  phone: string;
}

export interface SignupAdminRequest extends SignupBaseRequest {
  schoolCode: string;
  adminCode: string;
}

export interface SignupInternalRequest extends SignupBaseRequest {
  schoolCode: string;
}

export interface SignupResponse {
  userId: number;
  role: "ADMIN" | "INTERNAL" | "EXTERNAL";
  schoolCode?: string;
  schoolName?: string;
}

export const signupAdmin = async (payload: SignupAdminRequest) => {
  const { data } = await axiosInstance.post<SignupResponse>(
    "/users/signup/admin",
    payload
  );
  return data;
};

export const signupInternal = async (payload: SignupInternalRequest) => {
  const { data } = await axiosInstance.post<SignupResponse>(
    "/users/signup/internal",
    payload
  );
  return data;
};

export const signupExternal = async (payload: SignupBaseRequest) => {
  const { data } = await axiosInstance.post<SignupResponse>(
    "/users/signup/external",
    payload
  );
  return data;
};
