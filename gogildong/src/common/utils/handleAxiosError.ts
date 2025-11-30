import axios from "axios";
interface ServerFieldError {
  field: string;
  message: string;
  code?: string;
}
export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      return data.errors.map((err: ServerFieldError) => err.message).join("\n");
    }

    if (typeof data?.message === "string") {
      return data.message;
    }

    return error.message;
  }

  if (error instanceof Error) return error.message;

  return "알 수 없는 오류가 발생했습니다.";
}
