import Header from '@/common/components/Header';
import ImgSample from '@/Report/assets/imgs/img_sample.png';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// import ActionButton from '@/common/components/ActionButton';
import FacilityHeader from '@/FacilityView/components/FacilityHeader';
import InfoCard from '@/FacilityView/components/InfoCard';
import ReviewList from '@/FacilityView/components/ReviewList';

import { getFacilityDetail } from '@/FacilityView/api/getFacilityDetail';

import type { FacilityInfo } from '@/FacilityView/types/facility';
import type { ReviewResponse } from '@/FacilityView/types/review';

export default function FacilityViewDetail() {
  const { id } = useParams<{ id: string }>();

  const [facilityInfo, setFacilityInfo] = useState<FacilityInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const facilityTypeLabel: Record<string, string> = {
    restroom: '화장실',
    elevator: '엘리베이터',
    classroom: '강의실',
    etc: '기타'
  };

  // 대소문자 변환 추가
  const getHeaderTitle = () => {
    if (!facilityInfo?.facilityDetail.facilityType) return '로딩 중...';
    
    // API의 "RESTROOM"을 "restroom"으로 변환하여 매칭
    const typeKey = facilityInfo.facilityDetail.facilityType.toLowerCase();
    
    return facilityTypeLabel[typeKey] || facilityInfo.facilityDetail.facilityName;
  };

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getFacilityDetail(Number(id));
        setFacilityInfo(data);
      } catch (error) {
        console.error("시설 상세 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);
  
  const mockResponse: ReviewResponse = {
    total: 4,
    isLast: true,
    reviews: [
      {
        userId: 1,
        userName: '홍길동',
        reviewId: 23,
        reviewText: '화장실이 깔끔해요!',
        likeCount: 3,
        commentCount: 1,
        createdAt: '2025-10-30'
      }
    ]
  };

  const mockAiSummary = ['🚧좁음', '🧼청결함', '😃긍정적', '♿이동편의'];

  const displayImages =
    facilityInfo?.facilityDetail.facilityImages && facilityInfo.facilityDetail.facilityImages.length > 0
      ? facilityInfo.facilityDetail.facilityImages
      : (facilityInfo?.facilityDetail.facilityImage
        ? [facilityInfo.facilityDetail.facilityImage]
        : [ImgSample]);


  // 렌더링 분기
  const renderFacilityDetailInfo = () => {
    if (!facilityInfo) return null;

    const { facilityType } = facilityInfo.facilityDetail;
    
    // "RESTROOM" -> "restroom" 변환
    switch (facilityType.toLowerCase()) {
      case 'restroom':
        return <InfoCard data={facilityInfo} />;
      
      case 'elevator':
        return <div className="p-4 bg-white rounded-2xl border border-gray-20">엘리베이터 상세 정보 준비중</div>;
      
      case 'classroom':
        return <div className="p-4 bg-white rounded-2xl border border-gray-20">강의실 상세 정보 준비중</div>;

      default:
        return null;
    }
  };

  if (loading && !facilityInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col">
      {/* 함수 호출 형태로 변경 */}
      <Header title={getHeaderTitle()} />
      
      <div className="flex flex-col gap-6 overflow-y-auto bg-white p-4">
        {facilityInfo && (
          <>
            <FacilityHeader
              detail={facilityInfo.facilityDetail}
              images={displayImages}
              isAccessible={facilityInfo.isAccessible}
            />
            {renderFacilityDetailInfo()}
          </>
        )}

        <div className="flex flex-col gap-6 rounded-[20px] border border-gray-20 bg-linear-to-b from-white to-[#f2f2f2] px-4 py-6">
          <div className="flex flex-col gap-2">
            <p className="text-heading-sm text-black">AI 분석 요약</p>
            <div className="flex flex-1 justify-evenly gap-2">
              {mockAiSummary.map((item) => (
                <span key={item} className="text-caption-lg text-black">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <ReviewList
            facilityId={facilityInfo?.facilityDetail.facilityId}
            facilityName={facilityInfo?.facilityDetail.facilityName}
            aiSummary={mockAiSummary}
            reviews={mockResponse.reviews}
            total={mockResponse.total}
          />
        </div>
      </div>
      <div className="sticky bottom-0 bg-white p-4">
        {/* 시뮬레이션 버튼 주석 처리 */}
        {/* <ActionButton
          type="button"
          className="h-12 rounded-3xl bg-neon-100 text-white"
          label="시뮬레이션"
        ></ActionButton> */}
      </div>
    </div>
  );
}