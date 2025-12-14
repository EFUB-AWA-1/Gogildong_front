import axiosInstance from '@/common/api/axiosInstance';

export interface SchoolDetailResponse {
  schoolId: number;
  schoolName: string;
  address: string;
  latitude: number;
  longitude: number;
  tag: string[];
  bookmarked: boolean;
}

export interface FloorItem {
  floorId: number;    
  floorName: string;
}

export interface FloorListResponse {
  totalElements: number;
  floors: FloorItem[];
}

export interface FacilityItem {
  facilityId: number;
  facilityName: string;
  facilityNickname: string;
  facilityImage: string | null;
  facilityType: string;
  updateAt: string;   
  accessible: boolean; 
}

export interface FacilityListResponse {
  totalElements: number;
  facility: FacilityItem[];
}

// 학교 상세 정보 조회
export const getSchoolDetail = async (schoolId: number) => {
  const { data } = await axiosInstance.get<SchoolDetailResponse>(
    `/schools/${schoolId}`
  );
  return data;
};

// 교내 층 리스트 조회
export const getSchoolFloors = async (schoolId: number) => {
  const { data } = await axiosInstance.get<FloorListResponse>(
    `/schools/${schoolId}/floors`
  );
  return data;
};

export const getSchoolFacilities = async (
  schoolId: number, 
  floorId: number, 
  facilityType: string
) => {
  const { data } = await axiosInstance.get<FacilityListResponse>(
    `/schools/${schoolId}/floors/${floorId}`,
    {
      params: { type: facilityType }, 
    }
  );
  
  return data.facility;
};