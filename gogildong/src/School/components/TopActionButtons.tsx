import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/svgs/back.svg?react";
import ShareIcon from "../assets/svgs/share.svg?react";
import type { SchoolInfoProps } from "../types/schoolInfo";

export default function TopActionButtons({ name }: SchoolInfoProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute top-16 z-50 flex w-full items-center justify-between px-4">
        <button onClick={() => navigate(-1)} aria-label="뒤로 가기">
          <BackIcon />
        </button>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: name,
                url: window.location.href
              });
            } else {
              alert("이 브라우저에서는 공유 기능을 지원하지 않습니다.");
            }
          }}
          aria-label="공유하기"
        >
          <ShareIcon />
        </button>
      </div>
    </>
  );
}
