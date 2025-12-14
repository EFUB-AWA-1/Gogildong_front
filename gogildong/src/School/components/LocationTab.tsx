interface LocationTabProps {
  selectedTab: string;
  onSelect: (location: string) => void;
  disabled?: boolean;
}

export default function LocationTab({
  selectedTab,
  onSelect,
  disabled = false,
}: LocationTabProps) {
  const locations = ["화장실", "엘리베이터", "교실", "기타"];

  return (
    <div className=" w-full px-4 flex justify-between overflow-x-auto bg-white">
      {locations.map((location) => (
        <button
          key={location}
          onClick={() => onSelect(location)}
          className={`w-[68px] h-10 text-black whitespace-nowrap ${
            selectedTab === location
              ? "border-b-2 text-body-bold-sm"
              : "text-body-sm text-gray-60"
          } ${disabled ? "pointer-events-none" : ""}`}
        >
          {location}
        </button>
      ))}
    </div>
  );
}