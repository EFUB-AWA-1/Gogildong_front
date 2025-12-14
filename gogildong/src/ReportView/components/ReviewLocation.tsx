import DisabledIcon from "../assets/icon_disabled.svg?react";

type ReviewLocationProps = {
  facilityName: string;
  buildingName: string;
};

export default function ReviewLocation({ facilityName, buildingName }: ReviewLocationProps) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  return (
    <div className="mt-2 mr-4 ml-4 flex flex-col gap-1 self-stretch pr-1 pl-2">
      <div className="self-stretch text-[0.875rem] font-normal text-[#636363]">
        {buildingName} | ({today} 기준)
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="text-display-md font-bold text-[#000]">{facilityName}</div>
        <div>
          <DisabledIcon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}