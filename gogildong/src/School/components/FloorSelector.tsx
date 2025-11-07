interface FloorSelectorProps {
  selectedFloor: string;
  onSelect: (floor: string) => void;
  disabled?: boolean;
}

export default function FloorSelector({
  selectedFloor,
  onSelect,
  disabled = false,
}: FloorSelectorProps) {
  const floors = ["본관 1층", "본관 2층", "본관 3층", "본관 4층", "본관 5층"];

  return (
    <div className="w-full flex justify-start overflow-x-auto scrollbar-hide">
      <div className="flex gap-2  ">
        {floors.map((floor) => {
          const isSelected = selectedFloor === floor;

          const baseColor = isSelected
            ? disabled
              ? "bg-[#535353] text-white"
              : "bg-neon-100 text-black"
            : "bg-white text-black";

          return (
            <button
              key={floor}
              onClick={() => !disabled && onSelect(floor)}
              className={`px-[15px] py-2.5 rounded-[20px] text-body-sm whitespace-nowrap 
                ${baseColor}
                ${disabled ? "pointer-events-none" : ""}
              `}
            >
              {floor}
            </button>
          );
        })}
      </div>
    </div>
  );
}
