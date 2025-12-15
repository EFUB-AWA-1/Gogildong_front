import { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  useLocation as useRouterLocation
} from "react-router-dom";

import NavBar from "../../common/components/NavBar";
import type { NavKey } from "../../common/components/NavBar";
import SearchBar from "../components/SearchBar";
import BottomSheet from "../components/BottomSheet";
import useGeolocation from "../hooks/useGeolocation";
import { getNearbySchools } from "../api/gpsSchoolSearchApi";

import type { School } from "../types/school";
import customMarker from "../assets/icon_marker.svg";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const DEFAULT_CENTER = {
  lat: 37.5618588,
  lng: 126.9468339
};

export default function Home() {

  // 상태, ref
  const [active, setActive] = useState<NavKey>("home");
  const [query, setQuery] = useState("");
  
  const [nearbySchools, setNearbySchools] = useState<School[]>([]);
  const [visibleSchools, setVisibleSchools] = useState<School[]>([]);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any | null>(null);
  const markersRef = useRef<any[]>([]);
  
  const apiDebounceTimerRef = useRef<number | null>(null);
  const uiDebounceTimerRef = useRef<number | null>(null);
  
  // 최초 로딩 시 지도 범위 재설정 여부
  const isFirstLoadRef = useRef(true);

  const location = useGeolocation();
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();

  const searchState = (routerLocation.state || {}) as {
    keyword?: string;
    schools?: School[];
  };
  const searchKeyword = searchState.keyword ?? "";
  const searchSchools = searchState.schools ?? null;
  const isSearchMode = !!(searchSchools && searchSchools.length > 0);

  const currentSchoolList = isSearchMode ? searchSchools! : nearbySchools;

  // 검색어 유지 로직
  useEffect(() => {
    if (isSearchMode) {
      setQuery(searchKeyword);
    } else {
      setQuery("");
    }
  }, [isSearchMode, searchKeyword]);

  // gps 기준 근처 학교 조회 api
  const fetchSchools = async (lat: number, lng: number) => {
    try {
      const response = await getNearbySchools({
        lat,
        lng,
        radius: 1000,
      });
      setNearbySchools(response.schools);
    } catch (error) {
      console.error("학교 데이터 로드 실패", error);
    }
  };

  // 초기 데이터 로드 (위치 로딩 완료 후에만 실행)
  useEffect(() => {
    if (isSearchMode) return;
    
    // 위치 로딩이 안 됐으면 실행하지 않음
    if (!location.loaded) return;

    // 로딩 완료 후: 좌표가 있으면 그 좌표, 없으면(에러/거부) 기본값
    const lat = location.coordinates?.lat ?? DEFAULT_CENTER.lat;
    const lng = location.coordinates?.lng ?? DEFAULT_CENTER.lng;

    fetchSchools(lat, lng);
  }, [location.loaded, isSearchMode]);


  // 지도 생성 (위치 로딩 완료 후에만 실행됨)
  useEffect(() => {
    // 1. 아직 로딩 중이거나, 이미 지도가 있거나, DOM이 없으면 스킵
    if (!location.loaded) return;
    if (!mapRef.current || mapInstanceRef.current) return;

    // 2. 초기 중심좌표 결정 (성공 시 내 위치, 실패 시 이대)
    const lat = location.coordinates?.lat ?? DEFAULT_CENTER.lat;
    const lng = location.coordinates?.lng ?? DEFAULT_CENTER.lng;

    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3
    };

    const map = new kakao.maps.Map(mapRef.current, options);
    mapInstanceRef.current = map;

    // 지도 드래그 종료 시 데이터 갱신 이벤트 등록
    const handleMapMoveEnd = () => {
      if (isSearchMode) return;

      if (apiDebounceTimerRef.current) clearTimeout(apiDebounceTimerRef.current);
      
      apiDebounceTimerRef.current = window.setTimeout(() => {
        const center = map.getCenter();
        fetchSchools(center.getLat(), center.getLng());
      }, 500); 

      // 화면 내 리스트 즉시 갱신
      updateVisibleList();
    };

    kakao.maps.event.addListener(map, "dragend", handleMapMoveEnd);
    kakao.maps.event.addListener(map, "zoom_changed", handleMapMoveEnd);

  }, [location.loaded]); // location.loaded가 true가 되는 순간 딱 한 번 실행됨

  // 마커 렌더링 & 지도 범위 자동 조정
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // 마커 초기화
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const markerImage = new kakao.maps.MarkerImage(
      customMarker,
      new kakao.maps.Size(48, 48),
      { offset: new kakao.maps.Point(24, 24) }
    );

    // 마커 생성
    const newMarkers = currentSchoolList.map((school) => {
      const pos = new kakao.maps.LatLng(school.latitude, school.longitude);
      const marker = new kakao.maps.Marker({
        position: pos,
        title: school.schoolName,
        image: markerImage,
      });
      marker.setMap(map);
      return marker;
    });
    markersRef.current = newMarkers;

    // 지도 범위 재조정 (검색 모드 or 앱 최초 실행 시에만)
    // 드래그로 데이터를 받아왔을 땐 실행 안 함
    if (currentSchoolList.length > 0) {
      if (isSearchMode || isFirstLoadRef.current) {
        const bounds = new kakao.maps.LatLngBounds();
        currentSchoolList.forEach((s) => 
          bounds.extend(new kakao.maps.LatLng(s.latitude, s.longitude))
        );
        setTimeout(() => map.setBounds(bounds), 100);
        
        if (!isSearchMode) isFirstLoadRef.current = false;
      }
    }

    updateVisibleList();

  }, [currentSchoolList, isSearchMode]); 

  // 화면 내 학교 목록 필터링
  const updateVisibleList = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (uiDebounceTimerRef.current) clearTimeout(uiDebounceTimerRef.current);

    uiDebounceTimerRef.current = window.setTimeout(() => {
      const bounds = map.getBounds();
      const inViewList = currentSchoolList.filter((s) => {
        const pos = new kakao.maps.LatLng(s.latitude, s.longitude);
        return bounds.contain(pos);
      });
      setVisibleSchools(inViewList);
    }, 200);
  };

  // 렌더링

  if (!location.loaded) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
        <div className="text-gray-500 font-medium">위치 정보를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-end">
      <div className="fixed top-18 z-50">
        <SearchBar
          variant="home"
          value={query}
          onClear={() => {
            setQuery("");
            navigate("/home", { replace: true });
          }}
          onChangeQuery={setQuery}
        />
      </div>
      
      <div ref={mapRef} className="h-screen w-full"></div>
      
      <div>
        <BottomSheet schools={visibleSchools} />
      </div>
      
      <div className="fixed right-[1.38rem] bottom-6 left-[1.38rem] z-50">
        <NavBar active={active} onChange={setActive} />
      </div>
    </div>
  );
}