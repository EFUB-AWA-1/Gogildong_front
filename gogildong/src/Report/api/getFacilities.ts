import axiosInstance from '@/common/api/axiosInstance';

export const getBuildings = async () => {
  const { data } = await axiosInstance.get('/buildings');
  return data;
};

export const getFloorsByBuilding = async (buildingId: number) => {
  const { data } = await axiosInstance.get(`/buildings/${buildingId}/floors`);
  return data;
};

export const getFacilitiesByFloor = async (floorId: number) => {
  const { data } = await axiosInstance.get(`/floors/${floorId}/facilities`);
  return data;
};

export const getFloorPlan = async (schoolId: number, floorId: number) => {
  const { data } = await axiosInstance.get(
    `/schools/${schoolId}/floors/${floorId}/plan`
  );
  return data;
};
