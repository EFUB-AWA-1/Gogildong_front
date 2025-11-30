export function calculateJoinedDays(createAt: string): number {
  const created = new Date(createAt);
  const today = new Date();

  // 시·분·초 제거해서 날짜만 비교
  const createdDate = new Date(
    created.getFullYear(),
    created.getMonth(),
    created.getDate()
  );
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const diffMs = todayDate.getTime() - createdDate.getTime();
  if (diffMs < 0) return 0; // 미래 날짜 방어용

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays + 1; // ~일째
}
