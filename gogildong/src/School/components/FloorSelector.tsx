import type { FloorItem } from '../api/schoolDetailApi';

interface FloorSelectorProps {
  floors: FloorItem[];
  selectedFloorId: number | null;
  onSelect: (floorId: number) => void;
  disabled?: boolean;
}

export default function FloorSelector({
  floors,
  selectedFloorId,
  onSelect,
  disabled = false,
}: FloorSelectorProps) {
  
  return (
    <div className="w-full flex justify-start overflow-x-auto scrollbar-hide">
      <div className="flex gap-2">
        {floors.map((floor) => {
          const isSelected = selectedFloorId === floor.floorId;

          const baseColor = isSelected
            ? disabled
              ? "bg-[#535353] text-white"
              : "bg-neon-100 text-black"
            : "bg-white text-black";

          return (
            <button
              key={floor.floorId}
              onClick={() => !disabled && onSelect(floor.floorId)}
              className={`px-[15px] py-2.5 rounded-[20px] text-body-sm whitespace-nowrap 
                ${baseColor}
                ${disabled ? "pointer-events-none" : ""}
              `}
            >
              {floor.floorName}
            </button>
          );
        })}
      </div>
    </div>
  );
}