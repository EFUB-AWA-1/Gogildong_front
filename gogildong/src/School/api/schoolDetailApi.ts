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

export const getSchoolDetail = async (schoolId: number) => {
  const { data } = await axiosInstance.get<SchoolDetailResponse>(
    `/schools/${schoolId}`
  );
  return data;
};