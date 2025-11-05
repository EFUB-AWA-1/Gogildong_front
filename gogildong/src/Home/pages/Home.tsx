import React from "react";
import NavBar from "../../common/components/NavBar";
import type { NavKey } from "../../common/components/NavBar";
import SearchBar from "../components/SearchBar";
import InfoRequestHeader from "../components/InfoRequestHeader";

export default function Home() {
  const [active, setActive] = React.useState<NavKey>("home");

  return (
    <div className="flex flex-col justify-end items-center">
      <div className="fixed top-18 z-50">
        <SearchBar />
      </div>
      <div className="fixed bottom-6 left-[1.38rem] right-[1.38rem] z-50">
        <NavBar active={active} onChange={setActive} />
      </div>
    </div>
  );
}
