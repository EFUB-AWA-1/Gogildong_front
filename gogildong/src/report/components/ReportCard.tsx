import DisabilityIcon from '../assets/svgs/disability.svg?react';

interface ReportCardProps {
  title: string;
  date: string;
  location: string;
  isDisability?: boolean;
}

export default function ReportCard({
  title,
  date,
  location,
  isDisability,
}: ReportCardProps) {
  return (
    <div className='w-full h-40 bg-white rounded-xl flex flex-col justify-between px-3 py-2'>
      <div className='flex items-center justify-between'>
        <p className='text-heading-lg text-black'>{title}</p>
        {isDisability && <DisabilityIcon />}
      </div>
      <div className='flex items-center gap-1'>
        <span className='text-caption-sm text-black'>{date}</span>
        <span className='text-caption-sm text-black truncate'>{location}</span>
      </div>
    </div>
  );
}
