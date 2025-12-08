import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/common/components/Header';
import SampleImg from '@/Report/assets/imgs/img_sample.png';
import LocationIcon from '@/Report/assets/svgs/location.svg?react';

import AlertDialog from '../components/AlertDialog';
import ReportSuccess from '../components/ReportSuccess';
import ReportForm2 from '../components/ReportForm2';
import ReportForm1 from '../components/ReportForm1';
import { toFacilityLabel, type FacilityTypeParam } from '@/Report/types';

export default function ReportFlow() {
  const location = useLocation();
  const { facilityType: facilityTypeParam } = useParams<{
    id: string;
    facilityType: FacilityTypeParam;
  }>();

  const facilityType = toFacilityLabel(facilityTypeParam);
  const { photo } = (location.state as { photo?: string } | null) ?? {};

  const [step, setStep] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [locationData, setLocationData] = useState({
    building: '',
    floor: '',
    facility: ''
  });

  useEffect(() => {
    setStep(0);
    setShowAlert(false);
    setLocationData({ building: '', floor: '', facility: '' });
  }, [facilityType]);

  const formSequence: Array<'location' | 'toiletDetail'> =
    facilityType === '화장실' ? ['location', 'toiletDetail'] : ['location'];

  const isLastFormStep = step >= formSequence.length;

  const handleNext = () => setStep((prev) => prev + 1);
  const handleSubmit = () => setShowAlert(true);

  const renderStep = () => {
    if (isLastFormStep) return <ReportSuccess />;

    const current = formSequence[step];

    if (current === 'location') {
      return (
        <ReportForm1
          locationData={locationData}
          onChange={setLocationData}
          onNext={handleNext}
        />
      );
    }

    if (current === 'toiletDetail') {
      return <ReportForm2 onSubmit={handleSubmit} />;
    }

    return null;
  };

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

        <div className="mt-10">{renderStep()}</div>

        {showAlert && (
          <AlertDialog
            onConfirm={() => {
              setShowAlert(false);
              setStep(formSequence.length);
            }}
          />
        )}
      </div>
    </>
  );
}
