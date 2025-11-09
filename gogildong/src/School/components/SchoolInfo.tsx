import { useState } from "react";

import HeartIcon from "../assets/svgs/heart.svg?react";
import HeartOnIcon from "../assets/svgs/heart_on.svg?react";
import type { SchoolInfoProps } from "../types/schoolInfo";
import TopActionButtons from "./TopActionButtons";

export default function SchoolInfo({ img, name, address }: SchoolInfoProps) {
  const [liked, setLiked] = useState(false);
  const toggleLike = () => setLiked((prev) => !prev);
  return (
    <div className="w-full">
      <div className="relative">
        <img src={img} alt="학교 이미지" className="h-90 object-cover" />
        <TopActionButtons name={name} />
        <div className="absolute inset-0 bg-linear-to-b from-white/70 via-white/30 to-transparent" />
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
