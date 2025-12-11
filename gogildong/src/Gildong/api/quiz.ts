import axiosInstance from "@/common/api/axiosInstance";

export const getQuizList = async () => {
  const { data } = await axiosInstance.get("/quiz");
  return data.quizzes;
};

export const getQuizById = async (quizId: number) => {
  const { data } = await axiosInstance.get(`/quiz/${quizId}`);
  return data;
};

