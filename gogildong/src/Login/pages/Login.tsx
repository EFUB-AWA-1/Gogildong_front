import Header from "@/common/components/Header";
import Logo from "@/Login/assets/svgs/main_logo.svg?react";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header title="로그인" />
      <div className="mt-10 flex flex-1 flex-col items-center gap-10 px-4">
        <div className="flex flex-col items-center gap-[23px]">
          <Logo />
          <div className="flex flex-col items-center">
            <p>교내 배리어프리 시설을 한눈에</p>
            <p>모두가 함께 만드는 접근성</p>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
