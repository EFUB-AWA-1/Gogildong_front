import { useState } from 'react';
import LocationDropDown from './LocationDropDown';

interface LocationSelectorGroupProps {
  onChange: (data: {
    building: string;
    floor: string;
    facility: string;
  }) => void;
}

export default function LocationSelectorGroup({
  onChange,
}: LocationSelectorGroupProps) {
  const [formData, setFormData] = useState({
    building: '',
    floor: '',
    facility: '',
  });

  const floorOptionsMap: Record<string, string[]> = {
    본관: ['1층', '2층', '3층'],
    신관: ['지하 1층', '1층', '2층'],
    체육관: ['1층'],
  };

  const facilityOptionsMap: Record<string, string[]> = {
    '1층': ['1-A', '1-B'],
    '2층': ['1-C'],
    '3층': ['1-D'],
    '지하 1층': ['1-E'],
  };

  const handleBuildingChange = (val: string) => {
    const updated = { building: val, floor: '', facility: '' };
    setFormData(updated);
    onChange(updated);
  };

  const handleFloorChange = (val: string) => {
    const updated = { ...formData, floor: val, facility: '' };
    setFormData(updated);
    onChange(updated);
  };

  const handleFacilityChange = (val: string) => {
    const updated = { ...formData, facility: val };
    setFormData(updated);
    onChange(updated);
  };

  return (
    <div className='flex flex-1 w-full justify-around gap-4 mt-2'>
      <LocationDropDown
        label='건물'
        options={Object.keys(floorOptionsMap)}
        value={formData.building}
        onChange={handleBuildingChange}
        disabled={false}
      />

      <LocationDropDown
        label='층수'
        options={floorOptionsMap[formData.building] || []}
        value={formData.floor}
        onChange={handleFloorChange}
        disabled={!formData.building}
      />

      <LocationDropDown
        label='시설'
        options={facilityOptionsMap[formData.floor] || []}
        value={formData.facility}
        onChange={handleFacilityChange}
        disabled={!formData.floor}
      />
    </div>
  );
}
