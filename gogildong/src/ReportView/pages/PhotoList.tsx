import Header from '@/common/components/Header';
import PhotoCard from '../components/PhotoCard';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ReportImage } from '@/FacilityView/types/facilityImage';

import sample from '../assets/sample.png';
import sample2 from '../assets/sample2.png';
import sample3 from '../assets/sample3.png';
import sample4 from '../assets/sample4.jpg';

const dummyPhotoList: ReportImage[] = [
  { userId: 1, userName: '홍길동', reportId: 1, facilityImage: sample, createdAt: '2025-10-24T14:00:00' },
  { userId: 2, userName: '김철수', reportId: 2, facilityImage: sample, createdAt: '2025-10-25T09:30:00' },
  { userId: 3, userName: '이영희', reportId: 3, facilityImage: sample3, createdAt: '2025-10-26T18:20:00' },
  { userId: 3, userName: '이영희', reportId: 4, facilityImage: sample3, createdAt: '2025-10-26T18:21:00' },
  { userId: 3, userName: '이영희', reportId: 5, facilityImage: sample2, createdAt: '2025-10-26T18:22:00' },
  { userId: 4, userName: '박민수', reportId: 6, facilityImage: sample4, createdAt: '2025-10-27T11:00:00' }
];

export default function PhotoList() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { 
    facilityName?: string; 
    images?: ReportImage[];
    facilityType?: string;
    facilityId?: number; // [추가]
  };

  const facilityName = state?.facilityName || "1-A";
  const passedImages = state?.images;
  const facilityType = state?.facilityType || "etc";
  const facilityId = state?.facilityId; // [추가]

  const displayPhotos = passedImages && passedImages.length > 0
    ? passedImages
    : dummyPhotoList;

  const handleClickPhoto = (photo: ReportImage) => {
    navigate('/school/view/photos/detail', {
      state: {
        photos: displayPhotos,
        initialReportId: photo.reportId,
        facilityType,
        facilityId // [추가] 상세 화면으로 전달
      }
    });
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Header title={facilityName} />
      <div className="mb-14 flex justify-center overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 p-4">
          {displayPhotos.map((photo, idx) => (
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