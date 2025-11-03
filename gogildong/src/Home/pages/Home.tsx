// src/Home/Home.tsx
import React from "react";
import NavBar from "../../components/Common/NavBar";
import type { NavKey } from "../../components/Common/NavBar"; // 👈 타입 전용 import

function Home() {
  const [active, setActive] = React.useState<NavKey>("home");

  return (
    <div className="w-91 h-223 flex flex-col justify-end items-center pb-10 bg-slate-100">
      <NavBar active={active} onChange={setActive} />
    </div>
  );
}

export default Home;
