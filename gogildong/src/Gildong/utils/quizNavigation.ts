// quizNavigation.ts
import type { NavigateFunction } from 'react-router-dom';
import { getQuizList } from '../api/quiz';
import { findUnsolvedQuiz } from '../hooks/findUnsolvedQuiz';

export const goToNextUnsolvedQuiz = async (navigate: NavigateFunction, fallbackPath = '/gildong') => {
  const quizzes = await getQuizList();
  const unsolved = findUnsolvedQuiz(quizzes);

  if (!unsolved) {
    alert('모든 퀴즈를 완료했습니다!');
    navigate(fallbackPath);
    return;
  }

  navigate(`/quiz/${unsolved.quiz_id}`);
};
