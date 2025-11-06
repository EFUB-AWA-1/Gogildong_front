import React, { useEffect, useRef } from "react";
import NavBar from "../../common/components/NavBar";
import type { NavKey } from "../../common/components/NavBar";
import SearchBar from "../components/SearchBar";

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
    const position = new kakao.maps.LatLng(37.5611732, 126.9428198);
    const options = {
      center: position,
      level: 3,
    };

     new kakao.maps.Map(mapRef.current, options);
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
