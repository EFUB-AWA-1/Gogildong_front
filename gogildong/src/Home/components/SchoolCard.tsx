import { useEffect, useState } from "react";

import HeartIcon from "../assets/icon_heart_mini.svg?react";
import HeartOnIcon from "../assets/icon_heart_mini_on.svg?react";
import Tag from "./Tag";
import { useNavigate } from "react-router-dom";

type Props = {
  schoolId: number;
  schoolName: string;
  address: string;
  latitude: number;
  longitude: number;
  defaultBookmarked?: boolean;
  onToggleLike?: (liked: boolean) => void;
  tags?: string[];
};

export default function SchoolCard({
  schoolId,
  schoolName,
  address,
  latitude,
  longitude,
  defaultBookmarked = false,
  onToggleLike,
  tags = []
}: Props) {
  const [liked, setLiked] = useState(defaultBookmarked);
  const navigate = useNavigate();

  useEffect(() => {
    setLiked(defaultBookmarked);
  }, [defaultBookmarked]);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((prev) => {
      const next = !prev;
      onToggleLike?.(next);
      return next;
    });
  };

  const handleCardClick = () => {
    navigate(`/school/${schoolId}`, {
      state: {
        schoolId,
        name: schoolName,
        address,
        latitude,
        longitude
      }
    });
  };

  return (
    <div
      className="flex h-[6.31rem] w-full flex-col justify-center rounded-2xl bg-white px-3 py-2.75 shadow-[0_0_8px_0_rgba(0,0,0,0.08)]"
      onClick={handleCardClick}
    >
      <div className="mb-4 ml-1 flex w-full flex-row items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="font-pretendard mb-1 self-stretch text-[0.875rem] leading-150 font-bold text-[#000000]">
            {schoolName}
          </p>
          <p className="font-pretendard self-stretch text-caption-sm leading-150 font-normal text-[#000000]">
            {address}
          </p>
        </div>
        <button onClick={toggleLike} className="p-1 transition">
          {liked ? <HeartOnIcon /> : <HeartIcon />}{" "}
        </button>
      </div>
      <div className="ml-1 flex min-h-4 items-center gap-1">
        {tags.length > 0 && tags.map((t) => <Tag key={t} tag={t} />)}
      </div>
    </div>
  );
}
