import iconLock from "../assets/icon_lock.svg";

export default function AccessRestricted() {
  return (
    <div className="flex flex-col items-center justify-center h-75 p-4 self-stretch">
      {/* 아이콘 */}
      <img src={iconLock} alt="잠금 아이콘" className="w-6 h-6 mb-2" />

      {/* 메시지 */}
      <p className="text-black text-center font-pretendard text-[0.875rem] font-medium leading-150">
        정보 열람 신청 후에 <br />
        확인할 수 있어요
      </p>
    </div>
  );
}
