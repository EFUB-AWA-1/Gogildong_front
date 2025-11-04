interface LocationTabProps {
  selectedTab: string;
  onSelect: (location: string) => void;
}

export default function LocationTab({
  selectedTab,
  onSelect,
}: LocationTabProps) {
  const locations = ['화장실', '엘리베이터', '경사로계단', '기타'];

  return (
    <div className=' w-full px-4 flex justify-between overflow-x-auto bg-white'>
      {locations.map((location) => (
        <button
          key={location}
          onClick={() => onSelect(location)}
          className={`w-[68px] h-10 text-black whitespace-nowrap ${
            selectedTab === location
              ? 'border-b-2 text-body-bold-sm'
              : 'text-body-sm text-gray-60'
          }`}>
          {location}
        </button>
      ))}
    </div>
  );
}
