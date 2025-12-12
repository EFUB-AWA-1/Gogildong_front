export const findUnsolvedQuiz = (quizzes: any[]) => {
  return quizzes.find((q) => q.attemptStatus === "NONE") ?? null;
};
