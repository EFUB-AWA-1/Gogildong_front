import Header from '@/common/components/Header';
import PhotoCard from '../components/PhotoCard';
import { useNavigate } from 'react-router-dom';
import type { FacilityImageType } from '../types/facilityImage';

//이미지샘플
import sample from '../assets/sample.png'; //정사각형 샘플
import sample2 from '../assets/sample2.png'; //직사각형 샘플
import sample3 from '../assets/sample3.png'; //다른 사진 (직사각)
import sample4 from '../assets/sample4.jpg';

const photoList = [
  { userId: 1, reportId: 1, facilityImage: sample },
  { userId: 2, reportId: 2, facilityImage: sample },
  { userId: 3, reportId: 3, facilityImage: sample },
  { userId: 3, reportId: 4, facilityImage: sample3 },
  { userId: 3, reportId: 5, facilityImage: sample3 },
  { userId: 3, reportId: 7, facilityImage: sample2 },
  { userId: 3, reportId: 8, facilityImage: sample2 },
  { userId: 3, reportId: 9, facilityImage: sample2 },
  { userId: 3, reportId: 12, facilityImage: sample4 },
  { userId: 3, reportId: 13, facilityImage: sample4 }
];

export default function PhotoList() {
  const navigate = useNavigate();

  const handleClickPhoto = (photo: FacilityImageType) => {
    navigate('/school/view/photos/detail', {
      state: {
        photos: photoList, // 현재 시설의 사진 리스트
        initialReportId: photo.reportId
      }
    });
  };

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
              onClick={() => handleClickPhoto(photo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
