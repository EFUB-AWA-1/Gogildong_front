import React from "react";
import { useNavigate } from "react-router-dom";

import iconHome from "../../assets/Common/icon_home.svg";
import iconSchool from "../../assets/Common/icon_school.svg";
import iconGildong from "../../assets/Common/icon_gildong.svg";
import iconMyPage from "../../assets/Common/icon_mypage.svg";
import { useUserStore } from "@/Mypage/stores/useUserStore";

export type NavKey = "home" | "school" | "gildong" | "mypage";

interface NavBarProps {
  active: NavKey;
  onChange?: (key: NavKey) => void;
}

const ICONS: Record<NavKey, string> = {
  home: iconHome,
  school: iconSchool,
  gildong: iconGildong,
  mypage: iconMyPage
};


const NavBar: React.FC<NavBarProps> = ({ active, onChange }) => {
  const navigate = useNavigate();
  
  const user = useUserStore((state) => state.user);

  const handleClick = (key: NavKey) => () => {
    onChange?.(key);
    if (key === "home") navigate("/home");
    
    if (key === "school") {
      // user가 존재하는지 확인 후 이동
      if (user?.schoolId) {
        navigate(`/school/${user.schoolId}`);
      } else {
        // user 정보가 없을 때의 처리
        // console.error("사용자 정보가 없습니다.");
        navigate("/login"); 
      }
    }
    // 길동이 페이지 퍼블리싱 되면 수정
    // if (key === "gildong") navigate("/");
    if (key === "mypage") navigate("/mypage");
  };
  
  const isActive = (key: NavKey) => active === key;

  return (
    <div className="relative flex items-center justify-center">
      {/* 배경 바 */}
      <div className="flex h-15 w-82 shrink-0 items-center justify-center gap-6 rounded-[1.875rem] bg-white px-10 shadow-[0_0_12px_rgba(0,0,0,0.1)]">
        {/* 홈 */}
        <div
          className="relative grid cursor-pointer place-items-center"
          onClick={handleClick("home")}
        >
          <img
            src={ICONS.home}
            alt="home"
            className={`mx-[0.38rem] mt-[0.2rem] mb-[0.2rem] h-7 w-7 ${
              isActive("home") ? "opacity-100" : "opacity-40"
            } `}
          />
          {isActive("home") && (
            <span className="absolute -bottom-1 h-[3px] w-8 rounded-full bg-[#535353]" />
          )}
        </div>

        {/* 내 학교 */}
        <div
          className="relative grid cursor-pointer place-items-center"
          onClick={handleClick("school")}
        >
          <img
            src={ICONS.school}
            alt="board"
            className={`mx-[0.38rem] mt-[0.2rem] mb-[0.2rem] h-7 w-7 ${isActive("school") ? "opacity-100" : "opacity-40"}`}
          />
          {isActive("school") && (
            <span className="absolute -bottom-1 h-[3px] w-8 rounded-full bg-[#535353]" />
          )}
        </div>

        {/* 길동이 */}
        <div
          className="relative grid cursor-pointer place-items-center"
          onClick={handleClick("gildong")}
        >
          <img
            src={ICONS.gildong}
            alt="gildong"
            className={`mx-[0.38rem] mt-[0.2rem] mb-[0.2rem] h-7 w-7 ${
              isActive("gildong") ? "opacity-100" : "opacity-40"
            }`}
          />
          {isActive("gildong") && (
            <span className="absolute -bottom-1 h-[3px] w-8 rounded-full bg-[#535353]" />
          )}
        </div>

        {/* 마이페이지 */}
        <div
          className="relative grid cursor-pointer place-items-center"
          onClick={handleClick("mypage")}
        >
          <img
            src={ICONS.mypage}
            alt="mypage"
            className={`mx-[0.38rem] mt-[0.2rem] mb-[0.2rem] h-7 w-7 ${
              isActive("mypage") ? "opacity-100" : "opacity-40"
            }`}
          />
          {isActive("mypage") && (
            <span className="absolute -bottom-1 h-[3px] w-8 rounded-full bg-[#535353]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavBar);