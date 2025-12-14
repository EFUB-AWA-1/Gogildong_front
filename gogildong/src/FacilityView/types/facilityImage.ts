export interface ReportImage {
  userId: number;
  userName: string;
  reportId: number;
  facilityImage: string;
  createdAt: string | null;
}

// 전체 응답 구조
export interface FacilityImageResponse {
  total: number;
  reportImages: ReportImage[];
}


export type FacilityImageType = ReportImage;