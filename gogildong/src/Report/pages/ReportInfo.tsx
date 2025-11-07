import Header from "@/common/components/Header";
import SampleImg from "@/Report/assets/imgs/img_sample.png";
import SameplePlan from "@/Report/assets/imgs/samplePlan.png";
import LocationIcon from "@/Report/assets/svgs/location.svg?react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import LocationSelectorGroup from "../components/LocationSelectorGroup";
import SizeInput from "../components/SizeInput";
import ActionButton from "@/common/components/ActionButton";

export default function ReportInfo() {
  const location = useLocation();
  const photo = location.state?.photo;

  const [size, setSize] = useState({ width: "", height: "" });

  const [locationData, setLocationData] = useState({
    building: "",
    floor: "",
    facility: ""
  });

  const isLocationComplete =
    locationData.building && locationData.floor && locationData.facility;

  return (
    <div className="flex flex-col bg-white px-[30px]">
      <Header title="화장실 촬영" />
      <div className="flex flex-col gap-10">
        <div className="mt-10 flex flex-col items-center gap-5">
          <SizeInput onChange={setSize} />
          {photo ? (
            <div className="w-[60%] overflow-hidden rounded-3xl border-[6px] border-neon-100">
              <img
                src={photo}
                alt="촬영된 사진"
                className="h-auto w-full object-cover"
              />
            </div>
          ) : (
            <div className="w-[40%] max-w-sm overflow-hidden rounded-3xl border-[6px] border-neon-100">
              <img
                src={SampleImg}
                alt="기본 이미지"
                className="h-auto w-full object-cover opacity-70"
              />
              <p className="mt-2 text-center text-body-sm text-gray-60">
                테스트 사진입니다.
              </p>
            </div>
          )}
          <div className="text-body-bold-sm flex items-center text-black">
            <LocationIcon />
            이화여자대학교부속초등학교
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-5">
          <div className="flex w-full flex-col items-start gap-4">
            <p className="text-body-bold-lg">위치 선택 </p>
            <div className="flex w-full justify-center">
              <img src={SameplePlan} alt="학교 도면" />
            </div>
          </div>
          <LocationSelectorGroup onChange={setLocationData} />
        </div>
        <div className="flex flex-col">
          <p className="text-body-bold-lg">추가 정보</p>
          <input
            type="text"
            placeholder="예) 교무실 앞 화장실"
            className="w-full rounded-[1.25rem] border border-gray-40 px-[23px] py-[19px] text-caption-lg text-black outline-none"
          />
        </div>
        <ActionButton label="다음" disabled={!isLocationComplete} />
      </div>
    </div>
  );
}
