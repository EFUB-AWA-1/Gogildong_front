import axiosInstance from '@/common/api/axiosInstance';

interface QuizAnswerRequest {
  selectedLabel: string;
}

export const getQuizList = async () => {
  const { data } = await axiosInstance.get('/quiz');
  return data.quizzes;
};

export const getQuizById = async (quizId: number) => {
  const { data } = await axiosInstance.get(`/quiz/${quizId}`);
  return data;
};

export const submitQuizAnswer = async (
  quizId: number,
  payload: QuizAnswerRequest
) => {
  const { data } = await axiosInstance.post(`/quiz/${quizId}`, payload);
  return data;
};
