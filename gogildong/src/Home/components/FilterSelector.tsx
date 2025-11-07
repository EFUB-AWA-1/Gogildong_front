interface FilterSelectorProps {
  selectedFilter: string;
  onSelect: (filter: string) => void;
}

export default function FilterSelector({
  selectedFilter,
  onSelect,
}: FilterSelectorProps) {
  const filters = ["전체", "장애인 화장실", "엘리베이터", "경사로 계단"];

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex gap-2  ">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onSelect(filter)}
            className={`px-[15px] py-2.5 rounded-[20px] text-body-sm shadow-[0_0_12px_0_rgba(0,0,0,0.10)] text-black whitespace-nowrap ${
              selectedFilter === filter ? "bg-neon-100  " : "bg-white "
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
