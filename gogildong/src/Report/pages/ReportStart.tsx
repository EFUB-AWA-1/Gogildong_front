import Header from '@/common/components/Header';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActionButton from '@/common/components/ActionButton';

import Step0 from '../components/steps/Step0';
import Step1 from '../components/steps/Step1';
import Step2 from '../components/steps/Step2';
import Step3 from '../components/steps/Step3';
import type { FacilityType } from '@/Report/types';

export default function ReportStart() {
  const LAST_STEP_BY_TYPE: Record<FacilityType, number> = {
    화장실: 3,
    엘리베이터: 2,
    교실: 3,
    기타: 1
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState(0);
  const [facilityType, setFacilityType] = useState<FacilityType | null>(null);

  const handleNext = () => {
    if (step === 0 && !facilityType) return;

    const lastStep =
      facilityType && LAST_STEP_BY_TYPE[facilityType]
        ? LAST_STEP_BY_TYPE[facilityType]
        : 3;

    if (step === 3) {
      navigate(`/school/${id}/report/camera`, {
        state: { facilityType }
      });
    } else if (step >= lastStep) {
      navigate(`/school/${id}/report/camera`, {
        state: { facilityType }
      });
    } else {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    if (step === 0) navigate(-1);
    else setStep((prev) => prev - 1);
  };

  const lastStep =
    facilityType && LAST_STEP_BY_TYPE[facilityType]
      ? LAST_STEP_BY_TYPE[facilityType]
      : 3;

  const buttonLabel =
    step === 0 ? '선택' : step >= lastStep ? '촬영하기' : '다음';
  const title =
    step === 0 ? '제보하기' : `${Math.min(step, lastStep)}/${lastStep}`;
  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step0 selectedType={facilityType} onSelect={setFacilityType} />;

      case 1:
        return facilityType ? (
          <Step1 facilityType={facilityType} />
        ) : (
          <Step0 selectedType={facilityType} onSelect={setFacilityType} />
        );
      case 2:
        return facilityType && lastStep >= 2 ? (
          <Step2 facilityType={facilityType} />
        ) : (
          <Step0 selectedType={facilityType} onSelect={setFacilityType} />
        );
      case 3:
        return facilityType && lastStep >= 3 ? (
          <Step3 facilityType={facilityType} />
        ) : (
          <Step0 selectedType={facilityType} onSelect={setFacilityType} />
        );
    }
  };
  const isDisabled = step === 0 && !facilityType;

  return (
    <div
      className={`flex h-full min-h-screen flex-col items-center ${
        step === 0 ? 'bg-white' : 'bg-black'
      }`}
    >
      <Header title={title} onBackClick={handlePrev} darkMode={step !== 0} />

      <div className="mt-10 flex w-full flex-1 items-start justify-center">
        {renderStep()}
      </div>

      <div className="sticky bottom-0 w-full px-6 py-4">
        <ActionButton
          label={buttonLabel}
          onClick={handleNext}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}
