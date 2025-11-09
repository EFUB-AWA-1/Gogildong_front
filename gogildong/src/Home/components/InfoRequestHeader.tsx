import iconBack from "../../assets/backIcon.svg";

export default function InfoRequestHeader() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex h-30 w-full min-w-2 shrink-0 flex-row items-end p-4">
      <div className="flex w-full items-center justify-between">
        <img
          src={iconBack}
          alt="back"
          onClick={handleBack}
          className="h-11 w-11 shrink-0 cursor-pointer"
        />
        <div className="text-[1.125rem] leading-6.75 font-bold text-black">
          정보 열람 신청
        </div>
        <div className="h-11 w-11" />
      </div>
    </div>
  );
}
