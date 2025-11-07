import SchoolCard from "./SchoolCard";
import type { School } from "../pages/Home";

type ContentProps = {
  schools: School[];
  onToggleLike?: (id: number, liked: boolean) => void;
};

export default function BottomSheetContent({
  schools,
  onToggleLike,
}: ContentProps) {
  if (!schools?.length) {
    return (
      <div className="flex py-4 px-5 text-sm text-gray-500 justify-center">
        현재 범위에서 해당 학교가 존재하지 않습니다.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 h-auto opacity-70 text-sm">
        {schools.map((s) => (
          <SchoolCard
            key={s.schoolId}
            schoolId={s.schoolId}
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
