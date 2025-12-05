import { useState } from "react";
import FloorSelector from "../components/FloorSelector";

import LocationTab from "../components/LocationTab";
import SchoolInfo from "../components/SchoolInfo";
import ActionButton from "@/common/components/ActionButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AccessRestricted from "@/Home/components/AccessRestricted";
import type { SchoolInfoProps } from "../types/schoolInfo";
import FacilityGridList from "@/School/components/FacilityGridList";

const dummyUser = {
  userId: 1,
  name: "이화 학생",
  schoolId: 8026
};

export default function School() {
  const navigate = useNavigate();
  const { id } = useParams();
  const viewingId = Number(id);
  const [selectedTab, setSelectedTab] = useState("화장실");
  const [selectedFloor, setSelectedFloor] = useState("본관 1층");
  const { state } = useLocation();
  const schoolState = (state || {}) as SchoolInfoProps;

  const isInternal = viewingId === dummyUser.schoolId;

  const handleReportClick = () => {
    navigate(`/school/${id}/report`);
  };
  const handleRequestClick = () => {
    navigate(`/school/{id}/request`, {
      state: {
        name: schoolState.name ?? "개발용기본중학교고등학교",
        address:
          schoolState.address ?? "아무주소나넣어보자서대문구3로드뷰는이대부초",
        latitude: schoolState.latitude ?? 37.56115022,
        longitude: schoolState.longitude ?? 126.9427504
      }
    });
  };

  return (
    <div className={`${isInternal ? "bg-gray-10" : "bg-gray-20"}`}>
      <div className={`flex min-h-screen w-full flex-col items-center pb-28`}>
        <SchoolInfo
          name={schoolState.name ?? "개발용기본중학교고등학교"}
          address={
            schoolState.address ?? "아무주소나넣어보자서대문구3로드뷰는이대부초"
          }
          latitude={schoolState.latitude ?? 37.56115022}
          longitude={schoolState.longitude ?? 126.9427504}
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
            ? "bg-gray-10"
            : "bg-[linear-gradient(184deg,rgba(255,255,255,0)_24.88%,#fff_93.89%)]"
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
