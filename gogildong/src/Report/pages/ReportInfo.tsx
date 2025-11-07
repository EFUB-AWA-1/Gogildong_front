import Header from '@/common/components/Header';
import { useLocation } from 'react-router-dom';
import SampleImg from '@/Report/assets/imgs/img_sample.png';
import LocationIcon from '@/Report/assets/svgs/location.svg?react';
import { useEffect, useRef, useState } from 'react';
import LocationDropDown from '../components/LocationDropDown';

export default function ReportInfo() {
  const location = useLocation();
  const photo = location.state?.photo;

  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const widthSpanRef = useRef<HTMLSpanElement>(null);
  const widthInputRef = useRef<HTMLInputElement>(null);

  const heightSpanRef = useRef<HTMLSpanElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (widthSpanRef.current && widthInputRef.current) {
      const spanWidth = widthSpanRef.current.getBoundingClientRect().width;
      widthInputRef.current.style.width = `${spanWidth + 20}px`;
    }
  }, [width]);

  useEffect(() => {
    if (heightSpanRef.current && heightInputRef.current) {
      const spanHeight = heightSpanRef.current.getBoundingClientRect().width;
      heightInputRef.current.style.width = `${spanHeight + 20}px`;
    }
  }, [width]);

  const [formData, setFormData] = useState({
    building: '',
    floor: '',
    facility: '',
  });

  //*건물별로 층수 옵션을 매치
  const floorOptionsMap: Record<string, string[]> = {
    본관: ['1층', '2층', '3층'],
    신관: ['지하 1층', '1층', '2층'],
    체육관: ['1층'],
  };

  //*층별로 시설 옵션
  const facilityOptionsMap: Record<string, string[]> = {
    '1층': ['1-A', '1-B'],
    '2층': ['1-C'],
    '3층': ['1-D'],
    '지하 1층': ['1-E'],
  };

  const handleBuildingChange = (val: string) => {
    setFormData({
      building: val,
      floor: '',
      facility: '',
    });
  };

  const handleFloorChange = (val: string) => {
    setFormData({
      ...formData,
      floor: val,
      facility: '',
    });
  };

  const handleFacilityChange = (val: string) => {
    setFormData({
      ...formData,
      facility: val,
    });
  };

  return (
    <div className='bg-white '>
      <Header title='화장실 촬영' />
      <div className='flex flex-col items-center gap-5 mt-10'>
        <div className='flex flex-col justify-center items-center'>
          <p className='text-heading-sm text-black'>화장실 칸 폭은</p>
          <div className='flex items-center gap-2 text-heading-sm text-neon-100'>
            <p className='border border-gray-40 rounded-xl px-2 py-1 inline-block'>
              <input
                className='text-center outline-none bg-transparent'
                type='tel'
                ref={widthInputRef}
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
              <span
                ref={widthSpanRef}
                className='absolute opacity-0 whitespace-pre text-heading-sm'>
                {width || '0'}
              </span>
            </p>
            <span className='text-neon-100'>cm</span>
            <span className='text-black'>x</span>
            <p className='border border-gray-40 rounded-xl px-2 py-1 inline-block'>
              <input
                className='text-center outline-none bg-transparent'
                type='tel'
                ref={heightInputRef}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <span
                ref={heightSpanRef}
                className='absolute opacity-0 whitespace-pre text-heading-sm'>
                {height || '0'}
              </span>
            </p>
            <span className='text-neon-100'>cm</span>
          </div>
          {/* <p className='text-heading-sm text-black'>{''}입니다.</p> */}
        </div>
        {photo ? (
          <div className='w-[40%] max-w-sm rounded-3xl border-[6px] border-neon-100 overflow-hidden'>
            <img
              src={photo}
              alt='촬영된 사진'
              className='w-full h-auto object-cover'
            />
          </div>
        ) : (
          <div className='w-[40%] max-w-sm rounded-3xl border-[6px] border-neon-100 overflow-hidden'>
            <img
              src={SampleImg}
              alt='기본 이미지'
              className='w-full h-auto object-cover opa놱city-70'
            />
            <p className='text-gray-60 text-body-sm text-center mt-2'>
              테스트 사진입니다.
            </p>
          </div>
        )}
        <div className='text-body-bold-sm text-black flex items-center'>
          <LocationIcon />
          이화여자대학교부속초등학교
        </div>
      </div>
      <div className='flex justify-center gap-4 mt-2'>
        <LocationDropDown
          label='건물'
          options={['본관', '신관', '체육관']}
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
    </div>
  );
}
