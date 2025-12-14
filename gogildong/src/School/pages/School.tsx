import { useEffect, useMemo, useState } from 'react';
import FloorSelector from '../components/FloorSelector';
import LocationTab from '../components/LocationTab';
import SchoolInfo from '../components/SchoolInfo';
import ActionButton from '@/common/components/ActionButton';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AccessRestricted from '@/Home/components/AccessRestricted';
import type { SchoolInfoProps } from '../types/schoolInfo';
import FacilityGridList from '@/School/components/FacilityGridList';
import { useUserStore } from '@/Mypage/stores/useUserStore';

import { getSchoolDetail, type SchoolDetailResponse } from '../api/schoolDetailApi';

export default function School() {

  // 라우터 훅
  const navigate = useNavigate();
  const { id } = useParams();
  const viewingId = Number(id);
  const userSchoolId = useUserStore((state) => state.user?.schoolId ?? null);

  // 상태
  const [selectedTab, setSelectedTab] = useState('화장실');
  const [selectedFloor, setSelectedFloor] = useState('본관 1층');
  
  const { state } = useLocation();
  const locationState = (state || {}) as SchoolInfoProps;

  // 학교 상세 정보 조회 상태
  const [schoolData, setSchoolData] = useState<SchoolDetailResponse | null>(null);

  useEffect(() => {
    if (!viewingId) return;
    // 학교 상세 정보 조회
    const fetchDetail = async () => {
      try {
        const data = await getSchoolDetail(viewingId);
        setSchoolData(data);
      } catch (error) {
        console.error("학교 상세 정보 조회 실패", error);
        // 에러 처리 나중에 추가
      }
    };

    fetchDetail();
  }, [viewingId]);

  // isInternal 계산
  const isInternal = useMemo(() => {
    if (viewingId == null) return false;
    if (userSchoolId == null) return false;
    return viewingId === userSchoolId;
  }, [viewingId, userSchoolId]);

  // 화면에 표시할 학교 정보 결정 (API 데이터 우선, 없으면 location state 사용)
  const displayData = {
    name: schoolData?.schoolName ?? locationState.name ?? '학교 정보 로딩 중...',
    address: schoolData?.address ?? locationState.address ?? '',
    latitude: schoolData?.latitude ?? locationState.latitude ?? 37.56115022,
    longitude: schoolData?.longitude ?? locationState.longitude ?? 126.9427504,
  };

  const handleReportClick = () => {
    navigate(`/school/${id}/report`);
  };

  const handleRequestClick = () => {
    navigate(`/school/${id}/request`, {
      state: {
        name: displayData.name,
        address: displayData.address,
        latitude: displayData.latitude,
        longitude: displayData.longitude
      }
    });
  };

  return (
    <div className={`${isInternal ? 'bg-gray-10' : 'bg-gray-20'}`}>
      <div className={`flex min-h-screen w-full flex-col items-center pb-28`}>
        <SchoolInfo
          name={displayData.name}
          address={displayData.address}
          latitude={displayData.latitude}
          longitude={displayData.longitude}
        />
        
        <LocationTab
          selectedTab={selectedTab}
          onSelect={(location) => setSelectedTab(location)}
          disabled={!isInternal}
        />
        
        <section className="mt-4 flex w-full flex-col items-center gap-[27px] px-[15px]">
          <FloorSelector
            selectedFloor={selectedFloor}
            onSelect={(floor) => setSelectedFloor(floor)}
            disabled={!isInternal}
          />
          <div className="mb-24 flex w-full flex-col items-center">
            {isInternal ? <FacilityGridList /> : <AccessRestricted />}
          </div>
        </section>
      </div>
      
      <div
        className={`sticky bottom-0 w-full p-4 ${
          isInternal
            ? 'bg-gray-10'
            : 'bg-[linear-gradient(184deg,rgba(255,255,255,0)_24.88%,#fff_93.89%)]'
        }`}
      >
        {isInternal ? (
          <ActionButton label="제보하기" onClick={handleReportClick} />
        ) : (
          <ActionButton label="열람 신청" onClick={handleRequestClick} />
        )}
      </div>
    </div>
  );
}