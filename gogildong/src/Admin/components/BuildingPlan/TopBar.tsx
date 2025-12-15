import AddIcon from '@/Admin/assets/svgs/icon_add_tap.svg?react';
import Tablist from '@/Admin/components/BuildingPlan/Tablist';
import type { Building } from '@/Admin/types/buildingTypes';

type Props = {
  buildings: Building[];
  activeBuildingId: number | null;
  onChangeBuilding: (id: number) => void;
  onDeleteAll: () => void;
  onCreateBuilding: () => void;
};

export default function TopBar({
  buildings,
  activeBuildingId,
  onChangeBuilding,
  onDeleteAll,
  onCreateBuilding
}: Props) {
  return (
    <div className="flex w-full items-start gap-10">
      <button
        type="button"
        onClick={onDeleteAll}
        className="flex h-13.5 w-33.75 shrink-0 items-center justify-center rounded-2xl border border-transparent px-5 py-1.5 text-heading-lg text-gray-60 hover:border-gray-40 active:border-neon-100 active:shadow-[0_0_12px_0_rgba(170,235,47,0.30)]"
      >
        전체 삭제
      </button>

      <Tablist
        buildings={buildings}
        activeBuildingId={activeBuildingId}
        onChangeBuilding={onChangeBuilding}
      />

      <button
        type="button"
        onClick={onCreateBuilding}
        className="flex h-13.5 w-50 items-center justify-center gap-2 rounded-2xl border border-transparent hover:border-gray-40 active:border-neon-100 active:shadow-[0_0_12px_0_rgba(170,235,47,0.30)]"
      >
        <AddIcon className="h-8 w-8" />
        <span className="text-heading-lg text-black">새 건물 등록</span>
      </button>
    </div>
  );
}
