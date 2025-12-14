import TabButton from './TabButton';
import type { Building } from '@/Admin/types/buildingTypes';

type Props = {
  buildings: Building[];
  activeBuildingId: number | null;
  onChangeBuilding: (id: number) => void;
};

export default function Tablist({
  buildings,
  activeBuildingId,
  onChangeBuilding
}: Props) {
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center gap-4">
        {buildings.map((b) => (
          <TabButton
            key={b.buildingId}
            label={b.buildingName}
            active={activeBuildingId === b.buildingId}
            onClick={() => onChangeBuilding(b.buildingId)}
          />
        ))}
      </div>
    </div>
  );
}
