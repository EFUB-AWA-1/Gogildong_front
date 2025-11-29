export default function formatPhoneNumeber(value: string) {
  if (!value) return "";

  const digits = value.replace(/\D/g, ""); //숫자 아닌 모든 문자 제거하기

  const match = digits.match(/^(\d{0,3})(\d{0,4})(\d{0,4})$/);
  if (!match) return digits;

  const [, p1, p2, p3] = match;
  return [p1, p2, p3].filter(Boolean).join("-");
}
