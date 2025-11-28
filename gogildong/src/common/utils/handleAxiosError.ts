import axios from "axios";
export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (data?.message) return data.message;
    if (data?.error) return data.error;

    return error.message;
  }

  if (error instanceof Error) return error.message;

  return "알 수 없는 오류가 발생했습니다.";
}
