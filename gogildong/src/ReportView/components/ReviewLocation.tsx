import DisabledIcon from "../assets/icon_disabled.svg?react";

export default function ReviewLocation() {
  return (
    <div className="mt-2 mr-4 ml-4 flex flex-col gap-1 self-stretch pr-1 pl-2">
      <div className="self-stretch text-[0.875rem] font-normal text-[#636363]">
        본관1층 | 미술실 (2025-09-21 기준)
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="text-display-md font-bold text-[#000]">1-A</div>
        <div>
          <DisabledIcon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
