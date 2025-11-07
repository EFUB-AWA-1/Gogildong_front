import SchoolCard from "./SchoolCard";
import type { School } from "../pages/Home";

type ContentProps = {
  schools: School[];
  selectedFilter?: string;
  onToggleLike?: (id: number, liked: boolean) => void;
};

export default function BottomSheetContent({
  schools,
  selectedFilter,
  onToggleLike,
}: ContentProps) {
  if (!schools?.length) {
    return (
      <div className="flex py-4 px-5 text-sm text-gray-500 justify-center">
        현재 화면에 보이는 학교가 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 h-auto opacity-70 text-sm">
        {schools.map((s) => (
          <SchoolCard
            key={s.schoolId}
            schoolName={s.schoolName}
            address={s.address}
            defaultBookmarked={s.bookmarked}
            onToggleLike={(liked) => onToggleLike?.(s.schoolId, liked)}
            tags={s.tag}
          />
        ))}
      </div>
    </>
  );
}
