import axiosInstance from '@/common/api/axiosInstance';
import type { FacilityTypeParam } from '@/Report/types/facilityTypes';

export const getBuildings = async () => {
  const { data } = await axiosInstance.get('/buildings');
  return data;
};

export const getFloorsByBuilding = async (buildingId: number) => {
  const { data } = await axiosInstance.get(`/buildings/${buildingId}/floors`);
  return data;
};

export const getFacilitiesByFloor = async (
  floorId: number,
  type: FacilityTypeParam
) => {
  const { data } = await axiosInstance.get(`/floors/${floorId}/facilities`, {
    params: { type } // 쿼리 추가 - 타입별 시설조회로 변경
  });
  return data;
};

export const getFloorPlan = async (schoolId: number, floorId: number) => {
  const { data } = await axiosInstance.get(
    `/schools/${schoolId}/floors/${floorId}/plan`
  );
  return data;
};
