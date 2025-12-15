import { useEffect, useMemo, useState } from 'react';
import AddPlanCard from '@/Admin/components/BuildingPlan/AddPlanCard';
import TopBar from '@/Admin/components/BuildingPlan/TopBar';
import PlanCard from '@/Admin/components/BuildingPlan/PlanCard';
import type { Building, FloorPlan } from '@/Admin/types/buildingTypes';

export default function BuildingPlanContainer() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [activeBuildingId, setActiveBuildingId] = useState<number | null>(null);
  const [floorPlansByBuilding, setFloorPlansByBuilding] = useState<
    Record<number, FloorPlan[]>
  >({});

  useEffect(() => {
    const mock = {
      buildings: [
        { buildingId: 1, buildingName: '아산공학관' },
        { buildingId: 2, buildingName: '학관' },
        { buildingId: 3, buildingName: '조형예술관 A동' }
      ]
    };

    setBuildings(mock.buildings);
    setActiveBuildingId(mock.buildings[0]?.buildingId ?? null);

    setFloorPlansByBuilding({
      1: [
        {
          floorId: -1,
          floorName: '지하 1층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/eng_b1.jpg'
        },
        {
          floorId: 1,
          floorName: '1층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/eng_1.jpg'
        },
        {
          floorId: 2,
          floorName: '2층',
          floorPlanImage:
            ' https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/eng_2.jpg'
        },
        {
          floorId: 3,
          floorName: '3층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/eng_3.jpg'
        },
        {
          floorId: 4,
          floorName: '4층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/eng_4.jpg'
        },
        {
          floorId: 5,
          floorName: '5층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/eng_5.jpg'
        }
      ],
      2: [
        {
          floorId: 1,
          floorName: '1층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/hak_1.jpeg'
        },
        {
          floorId: 2,
          floorName: '2층',
          floorPlanImage:
            ' https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/hak_2.png'
        },
        {
          floorId: 3,
          floorName: '3층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/hak_3.png'
        },
        {
          floorId: 4,
          floorName: '4층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/hak_4.png'
        },
        {
          floorId: 6,
          floorName: '6층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/hak_6.png'
        },
        {
          floorId: 7,
          floorName: '7층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/hak_7.png'
        },
        {
          floorId: 8,
          floorName: '8층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/hak_8.png'
        }
      ],
      3: [
        {
          floorId: 1,
          floorName: '1층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/art_1.jpeg'
        },
        {
          floorId: 2,
          floorName: '2층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/art_2.jpeg'
        },
        {
          floorId: 4,
          floorName: '4층',
          floorPlanImage:
            'https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/art_4.jpeg'
        },
        {
          floorId: 5,
          floorName: '5층',
          floorPlanImage:
            ' https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/art_5.jpeg'
        },
        {
          floorId: 6,
          floorName: '6층',
          floorPlanImage:
            ' https://gogildong-s3.s3.ap-northeast-2.amazonaws.com/blueprint/art_6.jpeg'
        }
      ]
    });
  }, []);

  const floorPlans = useMemo(() => {
    if (activeBuildingId == null) return [];
    return floorPlansByBuilding[activeBuildingId] ?? [];
  }, [activeBuildingId, floorPlansByBuilding]);

  const hasPlans = floorPlans.length > 0;

  const handleDeleteAll = () => {
    if (activeBuildingId == null) return;
    setFloorPlansByBuilding((prev) => ({ ...prev, [activeBuildingId]: [] }));
  };

  return (
    <div className="flex min-h-110.5 w-full flex-col items-center justify-center gap-8 rounded-20 bg-white px-[1.88rem] py-9 shadow-[0_0_12px_0_rgba(170,235,47,0.30)]">
      <TopBar
        buildings={buildings}
        activeBuildingId={activeBuildingId}
        onChangeBuilding={setActiveBuildingId}
        onDeleteAll={handleDeleteAll}
        onCreateBuilding={() => {}}
      />

      <div className={hasPlans ? 'grid w-full grid-cols-3 gap-[1.88rem]' : ''}>
        {floorPlans.map((p) => (
          <PlanCard
            key={`${activeBuildingId}-${p.floorId}`}
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
