// 공통 School 타입 (응답 schools 배열 원소)
export type School = {
  schoolId: number;
  schoolName: string;
  address: string;
  latitude: number;
  longitude: number;
  tag: string[];
  bookmarked: boolean;
};

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
