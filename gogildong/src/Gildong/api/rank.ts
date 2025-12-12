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
    const {data} = await axiosInstance.get('/rank/schools/mine');
    return data;
}