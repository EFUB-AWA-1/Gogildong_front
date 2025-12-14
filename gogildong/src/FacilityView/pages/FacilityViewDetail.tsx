import Header from '@/common/components/Header';
import ImgSample from '@/Report/assets/imgs/img_sample.png';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FacilityHeader from '@/FacilityView/components/FacilityHeader';
import InfoCard from '@/FacilityView/components/InfoCard';
import ReviewList from '@/FacilityView/components/ReviewList';

import { getFacilityDetail } from '@/FacilityView/api/getFacilityDetail';
import { getFacilityImages } from '@/FacilityView/api/getFacilityImages';
import { getFacilityReviews } from '@/FacilityView/api/getFacilityReviews';

import type { FacilityInfo } from '@/FacilityView/types/facility';
import type { ReviewResponse } from '@/FacilityView/types/review';
import type { FacilityImageResponse, ReportImage } from '@/FacilityView/types/facilityImage';

export default function FacilityViewDetail() {
  const { id } = useParams<{ id: string }>();

  const [facilityInfo, setFacilityInfo] = useState<FacilityInfo | null>(null);
  const [facilityImages, setFacilityImages] = useState<ReportImage[]>([]);
  
  const [reviewData, setReviewData] = useState<ReviewResponse>({
    total: 0,
    last: true, 
    reviews: [],
    reviewSummary: '' // 초기값 추가
  } as any); 
  
  const [loading, setLoading] = useState(true);

  const facilityTypeLabel: Record<string, string> = {
    restroom: '화장실',
    elevator: '엘리베이터',
    classroom: '강의실',
    etc: '기타'
  };

  const getHeaderTitle = () => {
    if (!facilityInfo?.facilityDetail.facilityType) return '로딩 중...';
    const typeKey = facilityInfo.facilityDetail.facilityType.toLowerCase();
    return facilityTypeLabel[typeKey] || facilityInfo.facilityDetail.facilityName;
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [detailData, imageData, reviewsData] = await Promise.all([
          getFacilityDetail(Number(id)),
          getFacilityImages(Number(id)).catch(() => ({ total: 0, reportImages: [] } as FacilityImageResponse)),
          // 에러 발생 시 빈 객체 반환 구조 맞춤
          getFacilityReviews(Number(id)).catch(() => ({ 
            total: 0, 
            last: true, 
            reviews: [], 
            reviewSummary: '' 
          } as unknown as ReviewResponse))
        ]);

        setFacilityInfo(detailData);

        if (imageData && imageData.reportImages && imageData.reportImages.length > 0) {
          setFacilityImages(imageData.reportImages);
        }

        if (reviewsData) {
          setReviewData(reviewsData);
        }

      } catch (error) {
        console.error("데이터 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);


  const summaryList = reviewData.reviewSummary ? [reviewData.reviewSummary] : [];

  const displayImages: ReportImage[] = 
    facilityImages.length > 0 
      ? facilityImages 
      : (facilityInfo?.facilityDetail.facilityImage 
          ? [{ 
              userId: 0, 
              userName: 'System', 
              reportId: 0, 
              facilityImage: facilityInfo.facilityDetail.facilityImage, 
              createdAt: '' 
            }] 
          : [{ 
              userId: 0, 
              userName: 'System', 
              reportId: 0, 
              facilityImage: ImgSample, 
              createdAt: '' 
            }]);

  const renderFacilityDetailInfo = () => {
    if (!facilityInfo) return null;
    const { facilityType } = facilityInfo.facilityDetail;
    switch (facilityType.toLowerCase()) {
      case 'restroom': return <InfoCard data={facilityInfo} />;
      case 'elevator': return <div className="p-4 bg-white rounded-2xl border border-gray-20">엘리베이터 상세 정보 준비중</div>;
      case 'classroom': return <div className="p-4 bg-white rounded-2xl border border-gray-20">강의실 상세 정보 준비중</div>;
      default: return null;
    }
  };

  if (loading && !facilityInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col">
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
            <div className="flex flex-col gap-1">
              {summaryList.length > 0 ? (
                summaryList.map((item, index) => (
                  <p key={index} className="text-body-md text-black leading-150 break-keep whitespace-pre-wrap">
                    {item}
                  </p>
                ))
              ) : (
                <p className="text-body-md text-gray-60">분석된 요약이 없습니다.</p>
              )}
            </div>
          </div>
          
          <ReviewList
            facilityId={facilityInfo?.facilityDetail.facilityId}
            facilityName={facilityInfo?.facilityDetail.facilityName}
            aiSummary={summaryList}
            reviews={reviewData.reviews}
            total={reviewData.total}     
          />
        </div>
      </div>
      <div className="sticky bottom-0 bg-white p-4"></div>
    </div>
  );
}