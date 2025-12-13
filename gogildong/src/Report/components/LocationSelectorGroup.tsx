import { useEffect, useState } from 'react';
import LocationDropDown from './LocationDropDown';
import {
  getBuildings,
  getFacilitiesByFloor,
  getFloorsByBuilding
} from '@/Report/api/getFacilities';

interface LocationSelectorGroupProps {
  schoolId?: number;
  onChange: (data: {
    building: string;
    floor: string;
    facility: string;
  }) => void;
  onFloorSelect?: (floorId: number | null) => void;
}

type Option = { id: number; name: string };

export default function LocationSelectorGroup({
  schoolId,
  onChange,
  onFloorSelect
}: LocationSelectorGroupProps) {
  const [buildings, setBuildings] = useState<Option[]>([]);
  const [floors, setFloors] = useState<Option[]>([]);
  const [facilities, setFacilities] = useState<Option[]>([]);

  const [formData, setFormData] = useState({
    building: '',
    floor: '',
    facility: '',
    buildingId: null as number | null,
    floorId: null as number | null
  });

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const data = await getBuildings();
        const buildingList = Array.isArray(data.buildings)
          ? data.buildings.map(
              (b: { buildingId: number; buildingName: string }) => ({
                id: b.buildingId,
                name: b.buildingName
              })
            )
          : [];
        setBuildings(buildingList);
      } catch (e) {
        console.error('건물 목록을 불러오지 못했습니다', e);
        setBuildings([]);
      }
    };
    fetchBuildings();
  }, [schoolId]);

  const handleBuildingChange = async (name: string, id: number | null) => {
    const updated = {
      building: name,
      buildingId: id,
      floor: '',
      facility: '',
      floorId: null
    };
    setFormData(updated);
    setFloors([]);
    setFacilities([]);
    onChange({ building: name, floor: '', facility: '' });
    onFloorSelect?.(null);

    if (!id) return;
    try {
      const data = await getFloorsByBuilding(id);
      const list = Array.isArray(data.floors)
        ? data.floors.map((f: { floorId: number; floorName: string }) => ({
            id: f.floorId,
            name: f.floorName
          }))
        : [];
      setFloors(list);
    } catch (e) {
      console.error('층 목록을 불러오지 못했습니다', e);
      setFloors([]);
    }
  };

  const handleFloorChange = async (name: string, id: number | null) => {
    const updated = { ...formData, floor: name, floorId: id, facility: '' };
    setFormData(updated);
    setFacilities([]);
    onChange({ building: formData.building, floor: name, facility: '' });
    onFloorSelect?.(id ?? null);

    if (!id) return;
    try {
      const data = await getFacilitiesByFloor(id);
      const list = Array.isArray(data.facilities)
        ? data.facilities.map(
            (f: { facilityId: number; facilityName: string }) => ({
              id: f.facilityId,
              name: f.facilityName
            })
          )
        : [];
      setFacilities(list);
    } catch (e) {
      console.error('시설 목록을 불러오지 못했습니다', e);
      setFacilities([]);
    }
  };

  const handleFacilityChange = (name: string) => {
    const updated = { ...formData, facility: name };
    setFormData(updated);
    onChange({
      building: formData.building,
      floor: formData.floor,
      facility: name
    });
  };

  return (
    <div className="mt-2 flex w-full flex-1 justify-around gap-4">
      <LocationDropDown
        label="건물"
        options={buildings.map((b) => b.name)}
        value={formData.building}
        onChange={(val) => {
          const selected = buildings.find((b) => b.name === val);
          handleBuildingChange(val, selected?.id ?? null);
        }}
        disabled={false}
      />

      <LocationDropDown
        label="층수"
        options={floors.map((f) => f.name)}
        value={formData.floor}
        onChange={(val) => {
          const selected = floors.find((f) => f.name === val);
          handleFloorChange(val, selected?.id ?? null);
        }}
        disabled={!formData.building}
      />

      <LocationDropDown
        label="시설"
        options={facilities.map((f) => f.name)}
        value={formData.facility}
        onChange={handleFacilityChange}
        disabled={!formData.floor}
      />
    </div>
  );
}
