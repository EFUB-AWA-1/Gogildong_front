import { useState } from 'react';
import FloorSelector from '../components/FloorSelector';
import ReportGridList from '../components/ReportGridList';
import LocationTab from '../components/LocationTab';

export default function School() {
  const [selectedTab, setSelectedTab] = useState('화장실');
  const [selectedFloor, setSelectedFloor] = useState('본관 1층');

  return (
    <div className='bg-gray-10  w-full h-full flex flex-col items-center'>
      <LocationTab
        selectedTab={selectedTab}
        onSelect={(location) => setSelectedTab(location)}
      />
      <section className='w-full flex flex-col items-center gap-[27px] px-[15px] mt-4 '>
        <FloorSelector
          selectedFloor={selectedFloor}
          onSelect={(floor) => setSelectedFloor(floor)}
        />
        <div className='flex flex-col items-center w-full'>
          <ReportGridList />
        </div>
      </section>
    </div>
  );
}
