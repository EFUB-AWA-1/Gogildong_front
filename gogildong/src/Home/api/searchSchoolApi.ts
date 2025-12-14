import axiosInstance from "@/common/api/axiosInstance";
import type { School } from "../types/school";

interface SearchSchoolResponse {
  totalElements: number;
  totalPages: number;
  last: boolean;
  schools: School[];
}

export const searchSchools = async (query: string, page = 0, size = 20) => {
  const { data } = await axiosInstance.get<SearchSchoolResponse>('/schools/search', {
    params: {
      query,
      page,
      size
    }
  });
  return data;
};