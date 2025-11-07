import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../common/components/NavBar";
import type { NavKey } from "../../common/components/NavBar";
import SearchBar from "../components/SearchBar";
import customMarker from "../assets/icon_marker.svg";
import BottomSheet from "../components/BottomSheet";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

export type School = {
  schoolId: number;
  schoolName: string;
  address: string;
  latitude: number;
  longitude: number;
  tag: string[];
  bookmarked: boolean;
};

//좋아요 수정
export default function Home() {
  const [active, setActive] = React.useState<NavKey>("home");
  const mapRef = useRef(null);
  const markersRef = useRef<(any | undefined)[]>([]);
  const [visibleSchools, setVisibleSchools] = useState<School[]>([]);

  useEffect(() => {
    const position = new kakao.maps.LatLng(37.5618588, 126.9468339);
    const options = {
      center: position,
      level: 3,
    };
    const map = new kakao.maps.Map(mapRef.current, options);

    const markerImage = new kakao.maps.MarkerImage(
      customMarker,
      new kakao.maps.Size(48, 48),
      { offset: new kakao.maps.Point(24, 24) }
    );

    const markerPositions: School[] = [
      {
        schoolId: 12144,
        schoolName: "이화여자대학교",
        address: "서울특별시 서대문구 이화여대길 52",
        latitude: 37.56446452,
        longitude: 126.9502888,
        tag: [],
        bookmarked: false,
      },
      {
        schoolId: 3966,
        schoolName: "이화초등학교",
        address: "울산광역시 북구 화정4길 40",
        latitude: 35.66117868,
        longitude: 129.344286,
        tag: ["장애인 화장실"],
        bookmarked: false,
      },
      {
        schoolId: 5338,
        schoolName: "이화여자대학교사범대학부속이화금란고등학교",
        address: "서울특별시 서대문구 성산로 560",
        latitude: 37.56638886,
        longitude: 126.9473028,
        tag: ["장애인 화장실", "경사로 계단", "엘리베이터"],
        bookmarked: false,
      },
      {
        schoolId: 5394,
        schoolName: "이화초등학교",
        address: "충청남도 논산시 채운면 채운로 350",
        latitude: 36.15098525,
        longitude: 127.0719047,
        tag: [],
        bookmarked: false,
      },
      {
        schoolId: 6550,
        schoolName: "이화여자고등학교",
        address: "서울특별시 중구 정동길 26",
        latitude: 37.56617664,
        longitude: 126.9713244,
        tag: [],
        bookmarked: false,
      },
      {
        schoolId: 6963,
        schoolName: "이화중학교",
        address: "울산광역시 북구 산업로 1631",
        latitude: 35.65832707,
        longitude: 129.3391358,
        tag: ["장애인 화장실", "엘리베이터"],
        bookmarked: false,
      },
      {
        schoolId: 8026,
        schoolName: "이화여자대학교사범대학부속초등학교",
        address: "서울특별시 서대문구 성산로 512-39",
        latitude: 37.56115022,
        longitude: 126.9427504,
        tag: ["엘리베이터"],
        bookmarked: false,
      },
      {
        schoolId: 8517,
        schoolName: "이화여자외국어고등학교",
        address: "서울특별시 중구 통일로4길 30",
        latitude: 37.56557732,
        longitude: 126.9696417,
        tag: ["장애인 화장실"],
        bookmarked: false,
      },
      {
        schoolId: 8724,
        schoolName: "이화여자대학교병설미디어고등학교",
        address: "서울특별시 중랑구 망우로73길 56",
        latitude: 37.6031324,
        longitude: 127.1053324,
        tag: [],
        bookmarked: false,
      },
      {
        schoolId: 2895,
        schoolName: "이화여자대학교사범대학부속이화·금란중학교",
        address: "서울특별시 서대문구 성산로 520",
        latitude: 37.56264282,
        longitude: 126.9444886,
        tag: ["경사로 계단"],
        bookmarked: false,
      },
      {
        schoolId: 9820,
        schoolName: "평택이화초등학교",
        address: "경기도 평택시 평남로 906",
        latitude: 37.00356166,
        longitude: 127.1082237,
        tag: [],
        bookmarked: false,
      },
      {
        schoolId: 9489,
        schoolName: "서울대신초등학교",
        address: "서울특별시 서대문구 이화여대2길 27",
        latitude: 37.55795026,
        longitude: 126.9480572,
        tag: [],
        bookmarked: false,
      },
    ];

    const updateMarkersInView = () => {
      const bounds = map.getBounds();

      const inViewList = markerPositions.filter((s) => {
        const pos = new kakao.maps.LatLng(s.latitude, s.longitude);
        return bounds.contain(pos);
      });

      markerPositions.forEach((data, idx) => {
        const pos = new kakao.maps.LatLng(data.latitude, data.longitude);
        const inView = bounds.contain(pos);
        const existing = markersRef.current[idx];

        if (inView && !existing) {
          const marker = new kakao.maps.Marker({
            map,
            position: pos,
            title: data.schoolName,
            image: markerImage,
          });
          markersRef.current[idx] = marker;
        } else if (!inView && existing) {
          existing.setMap(null);
          markersRef.current[idx] = undefined;
        }
      });

      setVisibleSchools(inViewList);
    };

    kakao.maps.event.addListener(map, "tilesloaded", updateMarkersInView);
    kakao.maps.event.addListener(map, "idle", updateMarkersInView);

    return () => {
      kakao.maps.event.removeListener(map, "tilesloaded", updateMarkersInView);
      kakao.maps.event.removeListener(map, "idle", updateMarkersInView);
      markersRef.current.forEach((m) => m && m.setMap(null));
    };
  }, []);

  return (
    <div className="flex flex-col justify-end items-center">
      <div className="fixed top-18 z-50">
        <SearchBar variant="home" />
      </div>
      <div ref={mapRef} className="w-full h-screen"></div>
      <div>
        <BottomSheet schools={visibleSchools} />
      </div>
      <div className="fixed bottom-6 left-[1.38rem] right-[1.38rem] z-50">
        <NavBar active={active} onChange={setActive} />
      </div>
    </div>
  );
}
