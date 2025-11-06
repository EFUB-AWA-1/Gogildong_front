import React, { useEffect, useRef } from "react";
import NavBar from "../../common/components/NavBar";
import type { NavKey } from "../../common/components/NavBar";
import SearchBar from "../components/SearchBar";
import customMarker from "../assets/icon_marker.svg";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

export default function Home() {
  const [active, setActive] = React.useState<NavKey>("home");

  const mapRef = useRef(null);

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

    const bounds = new kakao.maps.LatLngBounds();

    const markerPositions = [
      {
        title: "이화여자대학교부속초등학교",
        lat: 37.5611732,
        lng: 126.9428198,
      },
      {
        title: "세브란스병원",
        lat: 37.5623371,
        lng: 126.9408692,
      },
    ];

    markerPositions.forEach((data) => {
      const pos = new kakao.maps.LatLng(data.lat, data.lng);
      new kakao.maps.Marker({
        map: map,
        position: pos,
        title: data.title,
        image: markerImage,
      });
      bounds.extend(pos);
    });

    if (markerPositions.length === 1) {
      const { lat, lng } = markerPositions[0];
      map.panTo(new kakao.maps.LatLng(lat, lng));
    } else if (markerPositions.length > 1) {
      map.setBounds(bounds);
    }
    {
      /*}
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(map);*/
    }
  }, []);

  return (
    <div className="flex flex-col justify-end items-center">
      <div className="fixed top-18 z-50">
        <SearchBar variant="home" />
      </div>
      <div ref={mapRef} className="w-full h-screen"></div>
      <div className="fixed bottom-6 left-[1.38rem] right-[1.38rem] z-50">
        <NavBar active={active} onChange={setActive} />
      </div>
    </div>
  );
}
