import React from "react";
import { useNavigate } from "react-router-dom";

import iconHome from "../../assets/Common/icon_home.svg";
import iconBoard from "../../assets/Common/icon_board.svg";
import iconCamera from "../../assets/Common/icon_camera.svg";
import iconGildong from "../../assets/Common/icon_gildong.svg";
import iconMyPage from "../../assets/Common/icon_mypage.svg";

export type NavKey = "home" | "board" | "camera" | "gildong" | "mypage";

interface NavBarProps {
  active: NavKey;
  onChange?: (key: NavKey) => void;
}

const ICONS: Record<NavKey, string> = {
  home: iconHome,
  board: iconBoard,
  camera: iconCamera,
  gildong: iconGildong,
  mypage: iconMyPage,
};

const NavBar: React.FC<NavBarProps> = ({ active, onChange }) => {
  const navigate = useNavigate();
  const handleClick = (key: NavKey) => () => {
    onChange?.(key);
    if (key === "home") navigate("/home");
  };
  const isActive = (key: NavKey) => active === key;

  return (
    <div className="relative flex justify-center items-center">
      {/* 배경 바 */}
      <div className="flex justify-center items-center w-80 h-15 gap-4.75 shrink-0 rounded-[1.875rem] bg-white shadow-[0_0_12px_rgba(0,0,0,0.1)]">
        {/* 홈 */}
        <div
          className="relative grid place-items-center cursor-pointer mr-4"
          onClick={handleClick("home")}
        >
          <img
            src={ICONS.home}
            alt="home"
            className={`w-7 h-7 ${
              isActive("home") ? "opacity-100" : "opacity-40"
            } `}
          />
          {isActive("home") && (
            <span className="absolute -bottom-1 w-8 h-[3px] rounded-full bg-[#535353]" />
          )}
        </div>

        {/* 통계 */}
        <div
          className="relative grid place-items-center cursor-pointer mr-[4.9425rem]"
          onClick={handleClick("board")}
        >
          <img
            src={ICONS.board}
            alt="board"
            className={`w-7 h-7 
            ${isActive("board") ? "opacity-100" : "opacity-40"}`}
          />
          {isActive("board") && (
            <span
              className="absolute -bottom-1 left-1/2 -translate-x-1/2
                 w-8 h-[3px] rounded-full bg-[#535353]"
            />
          )}
        </div>

        {/* 길동이 */}
        <div
          className="relative grid place-items-center cursor-pointer"
          onClick={handleClick("gildong")}
        >
          <img
            src={ICONS.gildong}
            alt="gildong"
            className={`w-7 h-7 ${
              isActive("gildong") ? "opacity-100" : "opacity-40"
            }`}
          />
          {isActive("gildong") && (
            <span className="absolute -bottom-1 left-0.35  w-8 h-[3px] rounded-full bg-[#535353]" />
          )}
        </div>

        {/* 마이페이지 */}
        <div
          className="relative grid place-items-center cursor-pointer ml-4"
          onClick={handleClick("mypage")}
        >
          <img
            src={ICONS.mypage}
            alt="mypage"
            className={`w-7 h-7 ${
              isActive("mypage") ? "opacity-100" : "opacity-40"
            }`}
          />
          {isActive("mypage") && (
            <span className="absolute -bottom-1 w-8 h-[3px] rounded-full bg-[#535353]" />
          )}
        </div>
      </div>

      {/* 카메라 */}
      <div
        onClick={handleClick("camera")}
        className="absolute flex w-18 h-18 p-4.5 items-center justify-center gap-2 shrink-0 
        rounded-full bg-[#AAEB2F] shadow-[0_0_12px_rgba(0,0,0,0.25)] active:scale-95 transition-transform"
      >
        <img src={ICONS.camera} alt="camera" className="w-8.5 h-8.5" />
      </div>
    </div>
  );
};

export default React.memo(NavBar);
