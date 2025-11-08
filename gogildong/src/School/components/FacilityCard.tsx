import DisabilityIcon from "../assets/svgs/disability.svg?react";

interface FacilityCardProps {
  title: string;
  date: string;
  location: string;
  isDisability?: boolean;
}

export default function FacilityCard({
  title,
  date,
  location,
  isDisability
}: FacilityCardProps) {
  return (
    <div className="flex h-40 w-full flex-col justify-between rounded-xl bg-white px-3 py-2">
      <div className="flex items-center justify-between">
        <p className="text-heading-lg text-black">{title}</p>
        {isDisability && <DisabilityIcon />}
      </div>
      <div className="flex items-center gap-1">
        <span className="text-caption-sm text-black">{date}</span>
        <span className="truncate text-caption-sm text-black">{location}</span>
      </div>
    </div>
  );
}
