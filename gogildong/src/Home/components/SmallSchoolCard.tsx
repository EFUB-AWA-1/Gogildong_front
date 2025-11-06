import ewha from "../../School/assets/imgs/ewha.png";

export default function SmallSchoolCard() {
  return (
    <>
      <div
        className="flex w-full h-22 py-2.75 px-3 items-center 
                gap-2 shrink-0 shadow-[0_0_8px_0_rgba(0,0,0,0.08)]
                rounded-2xl bg-white"
      >
        <div className="w-18 h-18 rounded-2xl shrink-0 aspect-4/3 overflow-hidden">
          <img
            src={ewha}
            alt="학교 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex w-55.75 h-18 flex-col items-start shrink-0">
          <div className="text-black font-bold text-[0.875rem] leading-5.25 ">
            이화여자대학교부속초등학교
          </div>
          <div className="font-normal text-caption-sm text-black leading-3.75">
            서울 서대문구 성산로 512-39
          </div>
        </div>
      </div>
    </>
  );
}
