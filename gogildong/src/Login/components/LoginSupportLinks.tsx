import { Link } from "react-router-dom";

export default function LoginSupportLinks() {
  return (
    <div className="flex gap-3">
      <Link to="/find-id">아이디 찾기</Link>
      <span>|</span>
      <Link to="/find-password">비밀번호 찾기</Link>
      <span>|</span>
      <Link to="/signup">회원가입</Link>
    </div>
  );
}
