import axiosInstance from '@/common/api/axiosInstance';

export const getMyRankingInAllUser = async () => {
  const { data } = await axiosInstance.get('/rank/mine');
  return data;
};

export const getMyRankingInMySchool = async () => {
  const { data } = await axiosInstance.get('/rank/school/mine');
  return data;
};

export const getMySchoolRanking = async () => {
  const { data } = await axiosInstance.get('/rank/schools/mine');
  return data;
};

export const getAllRankingInAllUser = async () => {
  const { data } = await axiosInstance.get('/rank');
  return data;
};

export const getAllRankingInMySchool = async () => {
  const { data } = await axiosInstance.get('/rank/school');
  return data;
};

export const getAllSchoolRanking = async () => {
  const { data } = await axiosInstance.get('/rank/schools');
  return data;
};
