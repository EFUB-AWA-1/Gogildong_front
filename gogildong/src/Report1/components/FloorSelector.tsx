interface FloorSelectorProps {
  selectedFloor: string;
  onSelect: (floor: string) => void;
}

export default function FloorSelector({
  selectedFloor,
  onSelect,
}: FloorSelectorProps) {
  const floors = ['본관 1층', '본관 2층', '본관 3층', '본관 4층', '본관 5층'];

  return (
    <div className='w-full flex justify-start overflow-x-auto scrollbar-hide'>
      <div className='flex gap-2  '>
        {floors.map((floor) => (
          <button
            key={floor}
            onClick={() => onSelect(floor)}
            className={`px-[15px] py-2.5 rounded-[20px] text-body-sm text-black whitespace-nowrap ${
              selectedFloor === floor ? 'bg-neon-100  ' : 'bg-white '
            }`}>
            {floor}
          </button>
        ))}
      </div>
    </div>
  );
}
