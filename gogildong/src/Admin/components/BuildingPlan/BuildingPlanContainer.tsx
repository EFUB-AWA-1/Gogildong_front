import { useEffect, useState } from 'react';
import AddPlanCard from '@/Admin/components/BuildingPlan/AddPlanCard';
import TopBar from '@/Admin/components/BuildingPlan/TopBar';
import PlanCard from '@/Admin/components/BuildingPlan/PlanCard';
import type { Building, FloorPlan } from '@/Admin/types/buildingTypes';
import testImg from '@/Admin/assets/testimg.png';

export default function BuildingPlanContainer() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [activeBuildingId, setActiveBuildingId] = useState<number | null>(null);
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);

  useEffect(() => {
    // TODO: 건물 리스트 조회 API 호출
    // const res: { buildings: Building[] } = await ...
    // setBuildings(res.buildings);
    // setActiveBuildingId(res.buildings[0]?.buildingId ?? null);

    // 임시 예시
    const mock = {
      buildings: [
        { buildingId: 2, buildingName: '별관' },
        { buildingId: 1, buildingName: '본관' },
        { buildingId: 3, buildingName: '도서관' }
      ]
    };
    setBuildings(mock.buildings);
    setActiveBuildingId(mock.buildings[0]?.buildingId ?? null);
  }, []);

  useEffect(() => {
    if (activeBuildingId == null) return;

    // TODO: 선택된 건물 도면 조회 API 호출 (activeBuildingId로)
    // const res: { floorPlans: FloorPlan[] } = await ...
    // setFloorPlans(res.floorPlans);

    // 임시 예시
    const mock = {
      floorPlans: [
        { floorId: 1, floorName: 'fdf', floorPlanImage: testImg },
        { floorId: 1, floorName: 'fdf', floorPlanImage: testImg },
        { floorId: 1, floorName: 'fdf', floorPlanImage: testImg },
        { floorId: 2, floorName: '1층', floorPlanImage: testImg }
      ]
    };
    setFloorPlans(mock.floorPlans);
  }, [activeBuildingId]);

  const hasPlans = floorPlans.length > 0;

  return (
    <div className="flex min-h-110.5 w-full flex-col items-center justify-center gap-8 rounded-20 bg-white px-[1.88rem] py-9 shadow-[0_0_12px_0_rgba(170,235,47,0.30)]">
      <TopBar
        buildings={buildings}
        activeBuildingId={activeBuildingId}
        onChangeBuilding={setActiveBuildingId}
        onDeleteAll={() => setFloorPlans([])}
        onCreateBuilding={() => {}}
      />
      <div className={hasPlans ? 'grid w-full grid-cols-3 gap-[1.88rem]' : ''}>
        {floorPlans.map((p) => (
          <PlanCard
            key={p.floorId}
            floorName={p.floorName}
            imageUrl={p.floorPlanImage}
            onEdit={() => {}}
          />
        ))}

        <AddPlanCard onClick={() => {}} />
      </div>
    </div>
  );
}
