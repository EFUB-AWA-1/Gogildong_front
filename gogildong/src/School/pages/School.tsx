import { useState } from 'react';
import FloorSelector from '../components/FloorSelector';

import LocationTab from '../components/LocationTab';
import SchoolInfo from '../components/SchoolInfo';
import ewha from '../assets/imgs/ewha.png';
import ActionButton from '@/common/components/ActionButton';
import { useNavigate, useParams } from 'react-router-dom';
import AccessRestricted from '@/Home/components/AccessRestricted';
import FacilityGridList from '@/School/components/FacilityGridList';

const dummyUser = {
  userId: 1,
  name: '이화 학생',
  schoolId: 8026
};

export default function School() {
  const navigate = useNavigate();
  const { id } = useParams();
  const viewingId = Number(id);
  const [selectedTab, setSelectedTab] = useState('화장실');
  const [selectedFloor, setSelectedFloor] = useState('본관 1층');

  const isInternal = viewingId === dummyUser.schoolId;

  const handleReportClick = () => {
    navigate('/school/report');
  };
  const handleRequestClick = () => {
    navigate('/school/request');
  };

  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center pb-28 ${isInternal ? 'bg-gray-10' : 'bg-gray-20'}`}
    >
      <SchoolInfo
        img={ewha}
        name="이화여자대학교부속초등학교"
        address="서울 서대문구 성산로 512"
        description="설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명"
      />
      <LocationTab
        selectedTab={selectedTab}
        onSelect={(location) => setSelectedTab(location)}
        disabled={!isInternal}
      />
      <section className="mt-4 flex w-full flex-col items-center gap-[27px] px-[15px]">
        <FloorSelector
          selectedFloor={selectedFloor}
          onSelect={(floor) => setSelectedFloor(floor)}
          disabled={!isInternal}
        />
        <div className="mb-24 flex w-full flex-col items-center">
          {isInternal ? <FacilityGridList /> : <AccessRestricted />}
        </div>
      </section>

      <div
        className={`sticky bottom-0 w-full p-4 ${
          isInternal
            ? 'bg-gray-10'
            : 'bg-[linear-gradient(184deg,rgba(255,255,255,0)_24.88%,#fff_93.89%)]'
        }`}
      >
        {isInternal ? (
          <ActionButton label="제보하기" onClick={handleReportClick} />
        ) : (
          <ActionButton label="열람 신청" onClick={handleRequestClick} />
        )}
      </div>
    </div>
  );
}
