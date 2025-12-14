// components/ClosetFilterSelector.tsx
interface Props {
  selectedFilter: string;
  onSelect: (filter: string) => void;
}

const filters = ["얼굴", "옷"];

export default function ClosetFilterSelector({
  selectedFilter,
  onSelect
}: Props) {
  return (
    <div className="flex px-4 gap-2 py-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSelect(filter)}
          className={`px-3.5 py-2 rounded-[20px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.10)] inline-flex justify-center items-center gap-2
            ${
              selectedFilter === filter
                ? "bg-neon-100"
                : "bg-white"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
