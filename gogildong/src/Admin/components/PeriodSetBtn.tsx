import CalenderIcon from '../assets/svgs/icon_calender.svg?react';

export default function PeriodSetBtn() {
  return (
    <div className="flex cursor-pointer items-center justify-center gap-4 rounded-[1.25rem] bg-white px-[1.12rem] py-2">
      <div className="text-heading-md text-black">2025.10.16 - 2025.11.15</div>
      <CalenderIcon className="h-12 w-12" />
    </div>
  );
}
