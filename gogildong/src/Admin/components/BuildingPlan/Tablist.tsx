import { useMemo, useState } from 'react';
import TabButton from './TabButton';
import type { Building } from '@/Admin/types/buildingTypes';
import BuildingModal from '@/Admin/components/BuildingPlan/BuildingModal';

type Props = {
  buildings: Building[];
  activeBuildingId: number | null;
  onChangeBuilding: (id: number) => void;
  onRenameBuilding: (buildingId: number, nextName: string) => void;
};

export default function Tablist({
  buildings,
  activeBuildingId,
  onChangeBuilding,
  onRenameBuilding
}: Props) {
  const [renameTargetId, setRenameTargetId] = useState<number | null>(null);

  const renameTarget = useMemo(() => {
    if (renameTargetId == null) return null;
    return buildings.find((b) => b.buildingId === renameTargetId) ?? null;
  }, [renameTargetId, buildings]);
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center gap-4">
        {buildings.map((b) => (
          <TabButton
            key={b.buildingId}
            label={b.buildingName}
            active={activeBuildingId === b.buildingId}
            onClick={() => onChangeBuilding(b.buildingId)}
            onOpenRename={() => setRenameTargetId(b.buildingId)}
          />
        ))}
      </div>
      <BuildingModal
        open={renameTargetId != null}
        title="건물 이름 변경"
        inputTitle="건물 이름"
        defaultValue={renameTarget?.buildingName ?? ''}
        submitLabel="변경 내용 저장"
        onClose={() => setRenameTargetId(null)}
        onSubmit={(nextName) => {
          if (renameTargetId == null) return;
          onRenameBuilding(renameTargetId, nextName);
          setRenameTargetId(null);
        }}
      />
    </div>
  );
}
