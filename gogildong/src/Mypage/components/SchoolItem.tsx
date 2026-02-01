type SchoolItemProps = {
  showButton?: boolean;
  onChangeClick?: () => void;
};

export default function SchoolItem({
  showButton = true,
  onChangeClick
}: SchoolItemProps) {
  return (
    <div className="shadow-[0_0_12px_0_rgba(170, 235, 47, 0.30)] mr-[1.13rem] ml-[0.87rem] flex w-full items-center justify-between rounded-2xl border border-neon-100 bg-white p-4">
      <div className="flex flex-col gap-1">
        <div className="truncate text-[1rem] leading-150 font-bold text-black">
          이화여자대학교사범대학부속이화금란중학교
        </div>
        <div className="self-stretch text-caption-sm text-black">
          서울 서대문구 성산로 512-39
        </div>
      </div>
      {showButton && (
        <button
          type="button"
          onClick={onChangeClick}
          className="flex shrink-0 p-2 text-body-sm text-gray-40"
        >
          변경
        </button>
      )}
    </div>
  );
}
