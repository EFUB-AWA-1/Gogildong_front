import { useEffect, useRef, useState } from "react";

import HeartIcon from "../assets/svgs/heart.svg?react";
import HeartOnIcon from "../assets/svgs/heart_on.svg?react";
import type { SchoolInfoProps } from "../types/schoolInfo";
import TopActionButtons from "./TopActionButtons";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

export default function SchoolInfo({
  name,
  address,
  latitude,
  longitude
}: SchoolInfoProps) {
  const [liked, setLiked] = useState(false);
  const toggleLike = () => setLiked((prev) => !prev);

  // DOM 요소(div)를 위한 Ref
  const roadviewContainerRef = useRef<HTMLDivElement | null>(null);
  // 로드뷰 객체(Instance) 저장해두기 위한 Ref
  const roadviewInstanceRef = useRef<any>(null);

  // 로드뷰 객체 생성 (컴포넌트 로딩 시 딱 한 번만 실행)
  useEffect(() => {
    if (!roadviewContainerRef.current || !kakao?.maps) return;

    // 이미 만들어져 있으면 중복 생성 방지
    if (roadviewInstanceRef.current) return;

    // 로드뷰 객체를 생성하고 Ref에 저장
    const roadview = new kakao.maps.Roadview(roadviewContainerRef.current);
    roadviewInstanceRef.current = roadview;
  }, []); // 의존성 배열 비움 -> 최초 1회만 실행

  // 좌표가 바뀔 때 "위치만 이동" (리렌더링 시 이 부분만 실행됨)
  useEffect(() => {
    // 만들어둔 로드뷰 객체를 꺼내옴
    const roadview = roadviewInstanceRef.current;
    if (!roadview || !kakao?.maps) return;

    const roadviewClient = new kakao.maps.RoadviewClient();
    const position = new kakao.maps.LatLng(latitude, longitude);

    // 좌표값으로 파노라마 ID를 찾아서 "이동(setPanoId)"만 시킴
    roadviewClient.getNearestPanoId(position, 100, (panoId: number) => {
      if (!panoId) return;
      roadview.setPanoId(panoId, position);
    });
  }, [latitude, longitude]); // 좌표가 바뀔 때 실행

  return (
    <div className="w-full">
      <div className="relative">
        <div
          ref={roadviewContainerRef} // 이름 변경: roadviewRef -> roadviewContainerRef
          className="h-90 object-cover"
          onTouchStart={() => {
            document.body.style.overflow = "hidden";
          }}
          onTouchEnd={() => {
            document.body.style.overflow = "";
          }}
        />
        <TopActionButtons name={name} />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/70 via-white/30 to-transparent" />
      </div>
      <div className="bg-white p-4">
        <div className="mb-3 flex justify-between">
          <div className="flex flex-col items-start">
            <p className="text-heading-lg">{name}</p>
            <p className="text-body-sm">{address}</p>
          </div>
          <button onClick={toggleLike} className="p-1 transition">
            {liked ? <HeartOnIcon /> : <HeartIcon />}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}