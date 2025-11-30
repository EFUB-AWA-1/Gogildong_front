import Header from "@/common/components/Header";
import NavBar, { type NavKey } from "@/common/components/NavBar";
import React from "react";
import ProfileSection from "../components/ProfileSection";
import MenuList from "../components/MenuList";
import { calculateJoinedDays } from "../utils/calculateJoinedDays";

type UserInfo = {
  userId: number;
  loginId: string;
  password: string;
  username: string;
  role: "INTERNAL" | "EXTERNAL";
  email: string;
  phone: string;
  createAt: string; // "2025-01-01"
  profileImageUrl: string | null;
};

export default function Mypage() {
  const [active, setActive] = React.useState<NavKey>("mypage");

  // TODO: 실제 API 연동으로 대체
  const user: UserInfo = {
    userId: 1,
    loginId: "testId",
    password: "testpw",
    username: "홍길동",
    role: "INTERNAL",
    email: "test@gamil.com",
    phone: "010-1234-5678",
    createAt: "2025-12-01",
    profileImageUrl: ""
  };

  const joinedDays = React.useMemo(
    () => calculateJoinedDays(user.createAt),
    [user.createAt]
  );

  const handleLogout = () => {
    // 로그아웃 로직
  };

  return (
    <>
      <Header title="마이페이지" />
      <div className="flex h-full flex-col bg-white">
        <ProfileSection
          nickname={user.username}
          joinedDays={joinedDays}
          profileImageUrl={user.profileImageUrl}
        />

        <MenuList loginId={user.loginId} onClickLogout={handleLogout} />
        <div className="fixed right-[1.38rem] bottom-6 left-[1.38rem] z-50">
          <NavBar active={active} onChange={setActive} />
        </div>
      </div>
    </>
  );
}
