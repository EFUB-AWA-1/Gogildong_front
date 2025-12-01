import Header from "@/common/components/Header";
import NavBar, { type NavKey } from "@/common/components/NavBar";
import React, { useEffect } from "react";
import ProfileSection from "../components/ProfileSection";
import MenuList from "../components/MenuList";
import { calculateJoinedDays } from "../utils/calculateJoinedDays";
import { useUserStore } from "../stores/useUserStore";
import { getUserInfo } from "../api/getUserInfo";

type UserInfo = {
  userId: number;
  loginId: string;
  password: string;
  username: string;
  role: "INTERNAL" | "EXTERNAL";
  email: string;
  phone: string;
  createdAt: string; // "2025-01-01"
  profileImageUrl: string | null;
};

export default function Mypage() {
  const [active, setActive] = React.useState<NavKey>("mypage");

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    getUserInfo();
  }, []);

  const joinedDays = React.useMemo(() => {
    if (!user) return 0;
    return calculateJoinedDays(user.createdAt);
  }, [user?.createdAt]);

  if (!user) {
    return (
      <>
        <div>로딩 중...</div>
      </>
    );
  }

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
