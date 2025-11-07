import { useEffect, useState } from "react";

import HeartIcon from "../assets/icon_heart_mini.svg?react";
import HeartOnIcon from "../assets/icon_heart_mini_on.svg?react";
import Tag from "./Tag";
import { useNavigate } from "react-router-dom";

type Props = {
  schoolId?: number;
  schoolName: string;
  address: string;
  defaultBookmarked?: boolean;
  onToggleLike?: (liked: boolean) => void;
  tags?: string[];
};

export default function SchoolCard({
  schoolId,
  schoolName,
  address,
  defaultBookmarked = false,
  onToggleLike,
  tags = [],
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
    if (schoolId) navigate(`/school/${schoolId}`);
    else navigate(`/school`);
  };

  return (
    <div
      className="flex flex-col w-full h-32.75 rounded-2xl bg-white 
                    justify-center py-2.75 px-3 shadow-[0_0_8px_0_rgba(0,0,0,0.08)] "
      onClick={handleCardClick}
    >
      <div className="w-full flex flex-row justify-between items-center mb-3 ">
        <div className="flex flex-col items-start ml-4 ">
          <p className="text-[#000000] font-pretendard text-[0.875rem] font-bold leading-150 self-stretch">
            {schoolName}
          </p>
          <p className="text-[#000000] font-pretendard text-caption-sm font-normal leading-150 self-stretch">
            {address}
          </p>
        </div>
        <button onClick={toggleLike} className="p-1 transition">
          {liked ? <HeartOnIcon /> : <HeartIcon />}{" "}
        </button>
      </div>
      <div className="flex items-center gap-1 ml-4 min-h-4">
        {tags.length > 0 && tags.map((t) => <Tag key={t} tag={t} />)}
      </div>
    </div>
  );
}
