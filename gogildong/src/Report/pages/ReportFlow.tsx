import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from '@/common/components/Header';
import SampleImg from '@/Report/assets/imgs/img_sample.png';
import LocationIcon from '@/Report/assets/svgs/location.svg?react';

import AlertDialog from '../components/AlertDialog';
import ReportSuccess from '../components/ReportSuccess';
import ReportForm2 from '../components/ReportForm2';
import ReportForm1 from '../components/ReportForm1';
import type { FacilityType } from '@/Report/types';

export default function ReportFlow() {
  const location = useLocation();
  const { photo, facilityType } =
    (location.state as {
      photo?: string;
      facilityType?: FacilityType;
    } | null) ?? {};

  const [step, setStep] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [locationData, setLocationData] = useState({
    building: '',
    floor: '',
    facility: ''
  });

  const handleNext = () => setStep((prev) => prev + 1);

  return (
    <>
      <Header title={facilityType ? `${facilityType} 촬영` : '화장실 촬영'} />
      <div className="relative flex flex-col bg-white px-[30px]">
        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="h-[183px] w-28 overflow-hidden rounded-3xl border-[6px] border-neon-100">
            <img
              src={photo ?? SampleImg}
              alt="촬영된 사진"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="text-body-bold-sm flex items-center text-black">
            <LocationIcon />
            {facilityType ?? '이화여자대학교부속초등학교'}
          </div>
        </div>

        <div className="mt-10">
          {step === 1 && (
            <ReportForm1
              locationData={locationData}
              onChange={setLocationData}
              onNext={handleNext}
            />
          )}
          {step === 2 && <ReportForm2 onSubmit={() => setShowAlert(true)} />}
          {step === 3 && <ReportSuccess />}
        </div>

        {showAlert && (
          <AlertDialog
            onConfirm={() => {
              setShowAlert(false);
              setStep(3);
            }}
          />
        )}
      </div>
    </>
  );
}
