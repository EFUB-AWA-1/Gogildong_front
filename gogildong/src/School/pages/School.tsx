import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '@/Mypage/stores/useUserStore';
import ActionButton from '@/common/components/ActionButton';
import AccessRestricted from '@/Home/components/AccessRestricted';

// 컴포넌트 import
import FloorSelector from '../components/FloorSelector';
import LocationTab from '../components/LocationTab';
import SchoolInfo from '../components/SchoolInfo';
import FacilityGridList from '@/School/components/FacilityGridList';

// 타입 및 API import
import type { SchoolInfoProps } from '../types/schoolInfo';
import { 
  getSchoolDetail, 
  getSchoolFloors, 
  getSchoolFacilities,
  type SchoolDetailResponse,
  type FloorItem,
  type FacilityItem
} from '../api/schoolDetailApi';

// 탭 이름 매핑
const FACILITY_TYPE_MAP: Record<string, string> = {
  '화장실': 'restroom',
  '엘리베이터': 'elevator',
  '교실': 'classroom', 
  '기타': 'etc'
};

export default function School() {
  const navigate = useNavigate();
  const { id } = useParams();
  const viewingId = Number(id);
  const userSchoolId = useUserStore((state) => state.user?.schoolId ?? null);
  const { state } = useLocation();
  
  // locationState가 없을 수도 있으므로 안전하게 처리
  const locationState = (state || {}) as Partial<SchoolInfoProps>;

  // 상태 관리
  const [selectedTab, setSelectedTab] = useState('화장실');
  
  // 데이터 상태
  const [schoolData, setSchoolData] = useState<SchoolDetailResponse | null>(null);
  const [floorList, setFloorList] = useState<FloorItem[]>([]);
  const [selectedFloorId, setSelectedFloorId] = useState<number | null>(null);
  const [facilityList, setFacilityList] = useState<FacilityItem[]>([]);

  // 권한 체크
  const isInternal = useMemo(() => {
    if (viewingId == null) return false;
    if (userSchoolId == null) return false;
    return viewingId === userSchoolId;
  }, [viewingId, userSchoolId]);

  // 학교 상세 정보 조회
  useEffect(() => {
    if (!viewingId) return;
    const fetchDetail = async () => {
      try {
        const data = await getSchoolDetail(viewingId);
        setSchoolData(data);
      } catch (error) {
        console.error("학교 상세 정보 조회 실패", error);
      }
    };
    fetchDetail();
  }, [viewingId]);

  // 층 리스트 조회
  useEffect(() => {
    if (!viewingId || !isInternal) return;

    const fetchFloors = async () => {
      try {
        const data = await getSchoolFloors(viewingId);
        setFloorList(data.floors);
        
        // 층 정보가 로드되면 첫 번째 층을 기본값으로 선택
        if (data.floors.length > 0) {
          setSelectedFloorId(data.floors[0].floorId);
        }
      } catch (error) {
        console.error("층 리스트 조회 실패", error);
      }
    };
    fetchFloors();
  }, [viewingId, isInternal]);

  // 시설 리스트 조회
  useEffect(() => {
    if (!viewingId || !isInternal || selectedFloorId === null) return;

    const fetchFacilities = async () => {
      try {
        const typeParam = FACILITY_TYPE_MAP[selectedTab] || 'restroom';
        const data = await getSchoolFacilities(viewingId, selectedFloorId, typeParam);
        setFacilityList(data);
      } catch (error) {
        console.error("시설 리스트 조회 실패", error);
        setFacilityList([]);
      }
    };
    fetchFacilities();
  }, [viewingId, isInternal, selectedFloorId, selectedTab]);



  const isLoading = !schoolData && !locationState.name;

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-20">
        <p className="text-gray-500 text-body-sm">학교 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  const displayData = {
    name: schoolData?.schoolName ?? locationState.name ?? '',
    address: schoolData?.address ?? locationState.address ?? '',
    // fallback 좌표는 실제 데이터가 실패했을 때만 사용
    latitude: schoolData?.latitude ?? locationState.latitude ?? 37.56115022, 
    longitude: schoolData?.longitude ?? locationState.longitude ?? 126.9427504,
  };

  const handleReportClick = () => navigate(`/school/${id}/report`);
  const handleRequestClick = () => {
    navigate(`/school/${id}/request`, { state: { ...displayData } });
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
          onSelect={setSelectedTab}
          disabled={!isInternal}
        />
        
        <section className="mt-4 flex w-full flex-col items-center gap-[27px] px-[15px]">
          <FloorSelector
            floors={floorList}
            selectedFloorId={selectedFloorId}
            onSelect={setSelectedFloorId}
            disabled={!isInternal}
          />
          
          <div className="mb-24 flex w-full flex-col items-center">
            {isInternal ? (
              <FacilityGridList facilities={facilityList} />
            ) : (
              <AccessRestricted />
            )}
          </div>
        </section>
      </div>
      
      <div className={`sticky bottom-0 w-full p-4 ${isInternal ? 'bg-gray-10' : 'bg-[linear-gradient(184deg,rgba(255,255,255,0)_24.88%,#fff_93.89%)]'}`}>
        {isInternal ? (
          <ActionButton label="제보하기" onClick={handleReportClick} />
        ) : (
          <ActionButton label="열람 신청" onClick={handleRequestClick} />
        )}
      </div>
    </div>
  );
}