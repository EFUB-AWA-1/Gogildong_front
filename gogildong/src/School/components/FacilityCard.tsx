import { useNavigate } from 'react-router-dom';
import DisabilityIcon from '../assets/svgs/disability.svg?react';

interface FacilityCardProps {
  facilityId: number;
  title: string;
  date: string;
  location: string;
  isDisability?: boolean;
}

export default function FacilityCard({
  facilityId,
  title,
  date,
  location,
  isDisability
}: FacilityCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/school/facility/${facilityId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex h-40 w-full flex-col justify-between rounded-xl bg-white px-3 py-2"
    >
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
