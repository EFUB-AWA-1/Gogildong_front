import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/common/components/Header';
import SampleImg from '@/Report/assets/imgs/img_sample.png';
import LocationIcon from '@/Report/assets/svgs/location.svg?react';

import AlertDialog from '../components/AlertDialog';
import ReportForm2 from '../components/ReportForm2';
import ReportForm1 from '../components/ReportForm1';
import MeasurementInputSection from '@/Report/components/MeasurementInputSection';
import {
  toFacilityLabel,
  type FacilityTypeParam
} from '@/Report/types/facilityTypes';
import type { Measurements } from '@/Report/types/measurement';

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
  const [detailData, setDetailData] = useState<Record<string, string>>({});
  const [pendingDetailData, setPendingDetailData] = useState<Record<
    string,
    string
  > | null>(null);
  const [floorId, setFloorId] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [flowStatus, setFlowStatus] = useState<
    'idle' | 'processing' | 'failed'
  >('idle');

  useEffect(() => {
    setStep(0);
    setLocationData({ building: '', floor: '', facility: '' });
    setMeasurements({});
    setDetailData({});
    setPendingDetailData(null);
    setFloorId(null);
    setShowAlert(false);
    setFlowStatus('idle');
  }, [facilityType]);

  if (!facilityType) return null;

  const formSequence: Array<'location' | 'detail'> =
    facilityType === '기타' ? ['location'] : ['location', 'detail'];

  const goToSuccess = (detail = detailData) => {
    if (!id || !facilityTypeParam) return;
    navigate(`/school/${id}/report/${facilityTypeParam}/success`, {
      state: {
        photo,
        facilityType,
        locationData,
        detail,
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

  const handleSubmit = (data: Record<string, string>) => {
    setDetailData(data);
    setPendingDetailData(data);
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
      goToSuccess(pendingDetailData ?? detailData);
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
          locationData={locationData}
          schoolId={id ? Number(id) : undefined}
          floorId={floorId ?? undefined}
          onFloorSelect={setFloorId}
          onChange={setLocationData}
          onNext={handleNext}
        />
      );
    }

    if (current === 'detail') {
      return (
        <ReportForm2 facilityType={facilityType} onSubmit={handleSubmit} />
      );
    }

    return null;
  };

  return (
    <>
      <Header title={facilityType ? `${facilityType} 촬영` : '촬영'} />
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

        <div className="mt-8">
          <MeasurementInputSection
            facilityType={facilityType}
            value={measurements}
            onChange={setMeasurements}
          />
        </div>

        <div className="mt-10">{renderStep()}</div>

        {showAlert && <AlertDialog onConfirm={handleConfirmSubmit} />}
      </div>
    </>
  );
}
