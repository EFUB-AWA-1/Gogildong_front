import React, { useEffect, useRef } from "react";
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

export default function Home() {
  const [active, setActive] = React.useState<NavKey>("home");
  const mapRef = useRef(null);
  const markersRef = useRef<(any | undefined)[]>([]);

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

    const markerPositions = [
      {
        title: "이화여자대학교",
        lat: 37.56446452,
        lng: 126.9502888,
      },
      {
        title: "이화초등학교",
        lat: 35.66117868,
        lng: 129.344286,
      },
      {
        title: "이화여자대학교사범대학부속이화금란고등학교",
        lat: 37.56638886,
        lng: 126.9473028,
      },
      {
        title: "이화초등학교",
        lat: 36.15098525,
        lng: 127.0719047,
      },
      {
        title: "이화여자고등학교",
        lat: 37.56617664,
        lng: 126.9713244,
      },
      {
        title: "이화중학교",
        lat: 35.65832707,
        lng: 129.3391358,
      },
      {
        title: "이화여자대학교사범대학부속초등학교",
        lat: 37.56115022,
        lng: 126.9427504,
      },
      {
        title: "이화여자외국어고등학교",
        lat: 37.56557732,
        lng: 126.9696417,
      },
      {
        title: "이화여자대학교병설미디어고등학교",
        lat: 37.6031324,
        lng: 127.1053324,
      },
      {
        title: "이화여자대학교사범대학부속이화·금란중학교",
        lat: 37.56264282,
        lng: 126.9444886,
      },
      {
        title: "평택이화초등학교",
        lat: 37.00356166,
        lng: 127.1082237,
      },
      {
        title: "서울대신초등학교",
        lat: 37.55795026,
        lng: 126.9480572,
      },
    ];

    const updateMarkersInView = () => {
      const bounds = map.getBounds();
      markerPositions.forEach((data, idx) => {
        const pos = new kakao.maps.LatLng(data.lat, data.lng);
        const inView = bounds.contain(pos);
        const existing = markersRef.current[idx];

        if (inView && !existing) {
          const marker = new kakao.maps.Marker({
            map,
            position: pos,
            title: data.title,
            image: markerImage,
          });
          markersRef.current[idx] = marker;
        } else if (!inView && existing) {
          existing.setMap(null);
          markersRef.current[idx] = undefined;
        }
      });
    };

    // 초기 1회 적용
    kakao.maps.event.addListener(map, "tilesloaded", updateMarkersInView);
    // 이동/확대/축소 후 갱신
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
        <BottomSheet />
      </div>
      <div className="fixed bottom-6 left-[1.38rem] right-[1.38rem] z-50">
        <NavBar active={active} onChange={setActive} />
      </div>
    </div>
  );
}
