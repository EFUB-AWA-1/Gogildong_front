import Header from "@/common/components/Header";
import NavBar, { type NavKey } from "@/common/components/NavBar";
import React, { useEffect } from "react";
import ProfileSection from "../components/ProfileSection";
import MenuList from "../components/MenuList";
import { calculateJoinedDays } from "../utils/calculateJoinedDays";
import { useUserStore } from "../stores/useUserStore";
import { getUserInfo } from "../api/getUserInfo";
import { useAuthStore } from "./../../Login/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Mypage() {
  const navigate = useNavigate();
  const [active, setActive] = React.useState<NavKey>("mypage");

  const user = useUserStore((state) => state.user);
  const logoutUser = useUserStore((state) => state.logout);
  const clearTokens = useAuthStore((state) => state.clearTokens);

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
    logoutUser();
    clearTokens();

    localStorage.removeItem("user-storage");
    localStorage.removeItem("auth-storage");

    navigate("/login");
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
