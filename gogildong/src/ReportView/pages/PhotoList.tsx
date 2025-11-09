import Header from "@/common/components/Header";
import PhotoCard from "../components/PhotoCard";
import sample from "../assets/sample.png"; //정사각형 샘플
import sample2 from "../assets/sample2.png"; //직사각형 샘플

const photoList = [
  { userId: 1, reportId: 1, facilityImage: sample },
  { userId: 2, reportId: 2, facilityImage: sample },
  { userId: 3, reportId: 3, facilityImage: sample },
  { userId: 3, reportId: 3, facilityImage: "" },
  { userId: 3, reportId: 3, facilityImage: sample2 },
  { userId: 3, reportId: 3, facilityImage: sample2 },
  { userId: 3, reportId: 3, facilityImage: sample2 },
  { userId: 3, reportId: 3, facilityImage: sample2 },
  { userId: 3, reportId: 3, facilityImage: sample2 },
  { userId: 3, reportId: 3, facilityImage: sample2 },
  { userId: 3, reportId: 3, facilityImage: sample2 }
];

export default function PhotoList() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Header title="1-A" />

      <div className="mb-14 flex justify-center overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {photoList.map((photo, idx) => (
            <PhotoCard
              key={`${idx}`}
              userId={photo.userId}
              reportId={photo.reportId}
              facilityImage={photo.facilityImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
