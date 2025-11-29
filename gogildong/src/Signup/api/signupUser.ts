import axiosInstance from "@/common/api/axiosInstance";

export interface SignupBaseRequest {
  loginId: string;
  password: string;
  username: string;
  email: string;
  phone: string;
  verificationCode: string
}

export interface EmailVerificationCodeRequest {
  email: string;
}

export interface EmailVerficationRequest {
  email: string;
  verificationCode: number;
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

export const sendVerificationCode = async (
  payload: EmailVerificationCodeRequest
) => {
  const { data } = await axiosInstance.post("/auth/email/code", payload);
  return data;
};

export const verifyEmailCode = async (payload: EmailVerficationRequest) => {
  const { data } = await axiosInstance.post("/auth/email/verify", payload);
  return data;
};

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
