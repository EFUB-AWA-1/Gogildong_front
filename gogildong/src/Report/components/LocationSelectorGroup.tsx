import { useEffect, useState } from 'react';
import LocationDropDown from './LocationDropDown';
import {
  getBuildings,
  getFacilitiesByFloor,
  getFloorsByBuilding
} from '@/Report/api/getFacilities';
import type { LocationData } from '@/Report/types/report';
import type { FacilityTypeParam } from '@/Report/types/facilityTypes';

interface LocationSelectorGroupProps {
  schoolId?: number;
  facilityType?: FacilityTypeParam;
  value?: LocationData;
  onChange: (data: LocationData) => void;
  onFloorSelect?: (floorId: number | null) => void;
}

type Option = { id: number; name: string };

export default function LocationSelectorGroup({
  schoolId,
  facilityType,
  value,
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
    floorId: null as number | null,
    facilityId: null as number | null
  });

  const loadFloors = async (buildingId: number | null) => {
    if (!buildingId) {
      setFloors([]);
      return;
    }
    try {
      const data = await getFloorsByBuilding(buildingId);
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

  const loadFacilities = async (
    floorId: number | null,
    type?: FacilityTypeParam
  ) => {
    if (!floorId || !type) {
      setFacilities([]);
      return;
    }
    try {
      const data = await getFacilitiesByFloor(floorId, type);
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

  useEffect(() => {
    if (!value) return;
    setFormData({
      building: value.building ?? '',
      buildingId: value.buildingId ?? null,
      floor: value.floor ?? '',
      floorId: value.floorId ?? null,
      facility: value.facility ?? '',
      facilityId: value.facilityId ?? null
    });

    if (value.buildingId) {
      loadFloors(value.buildingId);
    } else {
      setFloors([]);
    }

    if (value.floorId) {
      loadFacilities(value.floorId, facilityType);
    } else {
      setFacilities([]);
    }
  }, [
    facilityType,
    value?.building,
    value?.buildingId,
    value?.floor,
    value?.floorId,
    value?.facility,
    value?.facilityId
  ]);

  const handleBuildingChange = async (name: string, id: number | null) => {
    const updated = {
      building: name,
      buildingId: id,
      floor: '',
      facility: '',
      floorId: null,
      facilityId: null
    };
    setFormData(updated);
    setFloors([]);
    setFacilities([]);
    onChange({
      building: name,
      buildingId: id,
      floor: '',
      floorId: null,
      facility: '',
      facilityId: null
    });
    onFloorSelect?.(null);

    loadFloors(id);
  };

  const handleFloorChange = async (name: string, id: number | null) => {
    const updated = {
      ...formData,
      floor: name,
      floorId: id,
      facility: '',
      facilityId: null
    };
    setFormData(updated);
    setFacilities([]);
    onChange({
      building: formData.building,
      buildingId: formData.buildingId,
      floor: name,
      floorId: id,
      facility: '',
      facilityId: null
    });
    onFloorSelect?.(id ?? null);

    loadFacilities(id, facilityType);
  };

  const handleFacilityChange = (name: string) => {
    const selected = facilities.find((f) => f.name === name);
    const updated = {
      ...formData,
      facility: name,
      facilityId: selected?.id ?? null
    };
    setFormData(updated);
    onChange({
      building: formData.building,
      buildingId: formData.buildingId,
      floor: formData.floor,
      floorId: formData.floorId,
      facility: name,
      facilityId: selected?.id ?? null
    });
  };

  const facilityOptions = [...facilities.map((f) => f.name), '새 시설'];

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
        options={facilityOptions}
        value={formData.facility}
        onChange={handleFacilityChange}
        disabled={!formData.floor}
      />
    </div>
  );
}
