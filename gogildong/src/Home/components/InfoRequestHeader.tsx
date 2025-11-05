import React from "react";
import iconBack from "../../assets/Common/icon_back.svg";

export default function InfoRequestHeader() {
  const handleBack = () => {
    window.history.back(); // 나중에 navigate("/InfoRequest")로 교체해야할 수도..? 일단 해보고 수정
  };

  return (
    <div className="flex flex-row w-91 h-30 min-w-2 p-4 justify-between items-end shrink-0">
      <div className="flex w-full items-center justify-between">
        <img
          src={iconBack}
          alt="back"
          onClick={handleBack}
          className="w-11 h-11 shrink-0 cursor-pointer"
        />
        <div
          className="text-[1.125rem]      
                    font-bold             
                    leading-6.75   
                    text-black"
        >
          정보 열람 신청
        </div>
        <div className="w-11 h-11" />
      </div>
    </div>
  );
}
