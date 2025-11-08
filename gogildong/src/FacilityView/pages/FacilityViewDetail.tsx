import Header from '@/common/components/Header';
import { useEffect, useState } from 'react';

import InfoCard from '@/FacilityView/components/InfoCard';
import ReviewList from '@/FacilityView/components/ReviewList';
import type { FacilityInfo } from '@/FacilityView/types/facility';
import type { ReviewResponse } from '@/FacilityView/types/review';

export default function FacilityViewDetail() {
  const [facilityInfo, setFacilityInfo] = useState<FacilityInfo | null>(null);

  const facilityTypeLabel: Record<string, string> = {
    restroom: '화장실'
  };
  const headerTitle = facilityInfo?.facilityDetail.facilityType
    ? facilityTypeLabel[facilityInfo.facilityDetail.facilityType] ||
      facilityInfo.facilityDetail.facilityName
    : '로딩 중...';

  useEffect(() => {
    const mockData = {
      facilityDetail: {
        buildingName: '본관',
        floorName: '1',
        facilityId: 1,
        facilityName: '1-A',
        facilityNiceName: '미술실 옆 여자화장실',
        facilityType: 'restroom',
        reviewSummary: null,
        createdAt: '2025-11-03T21:55:41.000996'
      },
      doorWidth: 85.0,
      gender: 'female',
      isAccessible: true,
      doorType: 'hinged'
    } as const;

    setFacilityInfo(mockData);
  }, []);

  const mockResponse: ReviewResponse = {
    total: 2,
    isLast: false,
    reviews: [
      {
        userId: 1,
        userName: '홍길동',
        reviewId: 23,
        reviewText: '화장실이 깔끔해요!',
        likeCount: 3,
        commentCount: 1,
        createdAt: '2025-10-30'
      },
      {
        userId: 2,
        userName: '이순신',
        reviewId: 24,
        reviewText: '조명이 조금 어두워요.',
        likeCount: 1,
        commentCount: 0,
        createdAt: '2025-10-31'
      }
    ]
  };

  return (
    <div className="flex flex-col">
      <Header title={headerTitle} />
      <div className="flex flex-col gap-6 overflow-y-auto bg-white px-[30px] py-4">
        {facilityInfo && <InfoCard data={facilityInfo} />}
        <ReviewList reviews={mockResponse.reviews} total={mockResponse.total} />
      </div>
    </div>
  );
}
