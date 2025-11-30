import type { School } from "./school";

// /schools/nearby 쿼리 파라미터 형태
export type NearbySchoolQuery = {
  lat: number;
  lng: number;
  tag?: string; // 선택
  radius?: number; // m 단위, default 1000
  page?: number;
  size?: number;
};

// /schools/nearby 응답 형태
export type NearbySchoolResponse = {
  totalElements: number;
  totalPages: number;
  last: boolean;
  schools: School[];
};
