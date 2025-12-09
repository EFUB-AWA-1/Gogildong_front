import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/common/components/Header';
import SampleImg from '@/Report/assets/imgs/img_sample.png';
import LocationIcon from '@/Report/assets/svgs/location.svg?react';

import AlertDialog from '../components/AlertDialog';
import ReportForm2 from '../components/ReportForm2';
import ReportForm1 from '../components/ReportForm1';
import {
  toFacilityLabel,
  type FacilityTypeParam
} from '@/Report/types/facilityTypes';

export default function ReportFlow() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, facilityType: facilityTypeParam } = useParams<{
    id: string;
    facilityType: FacilityTypeParam;
  }>();

  const facilityType = toFacilityLabel(facilityTypeParam);
  const { photo } = (location.state as { photo?: string } | null) ?? {};

  const [step, setStep] = useState(0);
  const [locationData, setLocationData] = useState({
    building: '',
    floor: '',
    facility: ''
  });
  const [measurements, setMeasurements] = useState<Measurements>({});
  const [toiletDetail, setToiletDetail] = useState({
    gender: '',
    type: '',
    door: ''
  });
  const [pendingToiletDetail, setPendingToiletDetail] = useState<{
    gender: string;
    type: string;
    door: string;
  } | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [flowStatus, setFlowStatus] = useState<
    'idle' | 'processing' | 'failed'
  >('idle');

  useEffect(() => {
    setStep(0);
    setLocationData({ building: '', floor: '', facility: '' });
    setMeasurements({});
    setToiletDetail({ gender: '', type: '', door: '' });
    setPendingToiletDetail(null);
    setShowAlert(false);
    setFlowStatus('idle');
  }, [facilityType]);

  if (!facilityType) return null;

  const formSequence: Array<'location' | 'toiletDetail'> =
    facilityType === '화장실' ? ['location', 'toiletDetail'] : ['location'];

  const goToSuccess = (detail = toiletDetail) => {
    if (!id || !facilityTypeParam) return;
    navigate(`/school/${id}/report/${facilityTypeParam}/success`, {
      state: {
        photo,
        facilityType,
        locationData,
        toiletDetail: detail,
        dimensions: measurements
      }
    });
  };

  const handleNext = () => {
    if (formSequence.length === 1) {
      setShowAlert(true);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = (data: typeof toiletDetail) => {
    setToiletDetail(data);
    setPendingToiletDetail(data);
    setShowAlert(true);
  };

  const fakeSubmit = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 800);
    });

  const handleConfirmSubmit = async () => {
    setShowAlert(false);
    setFlowStatus('processing');

    try {
      //TODO : 실제 api 연결
      await fakeSubmit();
      goToSuccess(pendingToiletDetail ?? toiletDetail);
    } catch (e) {
      console.error('제보 제출 실패', e);
      setFlowStatus('failed');
    }
  };

  const renderStep = () => {
    const current = formSequence[step];

    if (current === 'location') {
      return (
        <ReportForm1
          facilityType={facilityType}
          locationData={locationData}
          measurements={measurements}
          onChange={setLocationData}
          onMeasurementsChange={setMeasurements}
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
          {flowStatus === 'processing' && (
            <p className="text-body-bold-md text-neon-100">
              제보 내용 인식 중...
            </p>
          )}
          {flowStatus === 'failed' && (
            <p className="text-body-bold-md text-neon-100">
              인식 실패
              <br />
              가이드에 맞춰 다시 작성해 주세요
            </p>
          )}
        </div>

        <div className="mt-10">{renderStep()}</div>

        {showAlert && <AlertDialog onConfirm={handleConfirmSubmit} />}
      </div>
    </>
  );
}
