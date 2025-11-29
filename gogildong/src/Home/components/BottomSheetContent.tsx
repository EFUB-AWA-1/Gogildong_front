import SchoolCard from "./SchoolCard";
import type { School } from "../pages/Home";

type ContentProps = {
  schools: School[];
  onToggleLike?: (id: number, liked: boolean) => void;
};

export default function BottomSheetContent({
  schools,
  onToggleLike
}: ContentProps) {
  if (!schools?.length) {
    return (
      <div className="flex justify-center px-5 py-4 text-sm text-gray-500">
        현재 범위에서 해당 학교가 존재하지 않습니다.
      </div>
    );
  }

  return (
    <>
      <div className="flex h-auto flex-col gap-2 text-sm opacity-70">
        {schools.map((s) => (
          <SchoolCard
            key={s.schoolId}
            schoolId={s.schoolId}
            schoolName={s.schoolName}
            address={s.address}
            latitude={s.latitude}
            longitude={s.longitude}
            defaultBookmarked={s.bookmarked}
            onToggleLike={(liked) => onToggleLike?.(s.schoolId, liked)}
            tags={s.tag}
          />
        ))}
      </div>
    </>
  );
}
