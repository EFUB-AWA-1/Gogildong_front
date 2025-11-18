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

  const roadviewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!roadviewRef.current || !kakao?.maps) return;

    // 로드뷰 컨테이너 / 객체 / 클라이언트 생성
    const roadview = new kakao.maps.Roadview(roadviewRef.current);
    const roadviewClient = new kakao.maps.RoadviewClient();

    const position = new kakao.maps.LatLng(latitude, longitude);

    // 특정 위치 기준으로 가장 가까운 panoId 가져와서 로드뷰 띄우기
    roadviewClient.getNearestPanoId(position, 50, (panoId: number) => {
      if (!panoId) return;
      roadview.setPanoId(panoId, position);
    });
  }, [latitude, longitude]);

  return (
    <div className="w-full">
      <div className="relative">
        <div ref={roadviewRef} className="h-90 object-cover" />
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
