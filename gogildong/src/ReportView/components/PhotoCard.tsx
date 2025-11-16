type PhotoCardProps = {
  userId: number;
  userName?: String;
  reportId: number;
  facilityImage?: string;
};

export default function PhotoCard({ facilityImage }: PhotoCardProps) {
  return (
    <div className="h-42 w-40 shrink-0 rounded-lg">
      {facilityImage ? (
        <img
          src={facilityImage}
          className="h-full w-full rounded-lg object-cover"
        />
      ) : (
        <div className="h-full w-full rounded-lg bg-gray-20">
          <p>이미지가 존재하지 않습니다.</p>
        </div>
      )}
    </div>
  );
}
