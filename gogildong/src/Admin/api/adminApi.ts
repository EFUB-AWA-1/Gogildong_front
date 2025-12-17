import axiosInstance from '@/common/api/axiosInstance';

export interface AdminSchoolItem {
  region: string;
  eduLevel: string;
  schoolName: string;
  schoolCode: string;
  status: string; 
  adminPhone: string;
  registeredAt: string;
}

export interface AdminSchoolListResponse {
  total: number;
  schools: AdminSchoolItem[];
}

// 등록된 학교 목록 조회
export const getRegisteredSchools = async (page: number, size: number = 10) => {
  const { data } = await axiosInstance.get<AdminSchoolListResponse>(
    `/admin/schools`,
    {
      params: { page, size }, // page=0부터 시작
    }
  );
  return data;
};

// API 응답 데이터 타입
export interface ReportItem {
  id: number;
  reportedAt: string;
  flagCount: number;
  isPublic: boolean;
}

export interface ReportListResponse {
  reports: ReportItem[];
}

// 제보 목록 조회
export const getReports = async (page: number, size: number = 10) => {
  const { data } = await axiosInstance.get<ReportListResponse>(
    `/reports`,
    {
      params: { page, size },
    }
  );
  return data;
};

export interface AccessRequestItem {
  requestId: number;
  loginId: string;
  username: string;
  email: string;
  schoolId: number;
  schoolName: string;
  status: string; // 'PENDING', 'APPROVED', 'REJECTED'
  createdAt: string;
}

export interface AccessRequestListResponse {
  viewRequests: AccessRequestItem[];
}

// 열람 요청 목록 조회
export const getAccessRequests = async (page: number, size: number = 10) => {
  const { data } = await axiosInstance.get<AccessRequestListResponse>(
    `/view-requests`,
    {
      params: { page, size },
    }
  );
  return data;
};