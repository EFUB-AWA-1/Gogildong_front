import { useState } from 'react';
import FloorSelector from '../components/FloorSelector';
import ReportGridList from '../components/ReportGridList';
import LocationTab from '../components/LocationTab';
import SchoolInfo from '../components/SchoolInfo';
import ewha from '../assets/imgs/ewha.png';
import ActionButton from '@/common/components/ActionButton';
import { useNavigate } from 'react-router-dom';

export default function School() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('화장실');
  const [selectedFloor, setSelectedFloor] = useState('본관 1층');

  const handleReportClick = () => {
    navigate('/school/report');
  };

  return (
    <div className='bg-gray-10  w-full flex flex-col items-center '>
      <SchoolInfo
        img={ewha}
        name='이화여자대학교부속초등학교'
        address='서울 서대문구 성산로 512'
        description='설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명'
      />
      <LocationTab
        selectedTab={selectedTab}
        onSelect={(location) => setSelectedTab(location)}
      />
      <section className='w-full flex flex-col items-center gap-[27px] px-[15px] mt-4 '>
        <FloorSelector
          selectedFloor={selectedFloor}
          onSelect={(floor) => setSelectedFloor(floor)}
        />
        <div className='flex flex-col w-full items-center mb-24 '>
          <ReportGridList />
        </div>
      </section>
      <div className='w-full p-4 sticky bottom-0 bg-gray-10'>
        <ActionButton label='제보하기' onClick={handleReportClick} />
      </div>
    </div>
  );
}
