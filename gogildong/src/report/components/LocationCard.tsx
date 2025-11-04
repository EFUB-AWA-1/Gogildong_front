interface LocationCardProps {
  title: string;
  date: string;
  location: string;
}

export default function LocationCard({
  title,
  date,
  location,
}: LocationCardProps) {
  return (
    <div className='w-[158px] h-40 bg-white rounded-xl  flex flex-col justify-between '>
      <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
      <div className='flex flex-col items-start gap-1'>
        <p className='text-xs text-gray-500'>{date}</p>
        <p className='text-sm text-gray-700 truncate'>{location}</p>
      </div>
    </div>
  );
}
