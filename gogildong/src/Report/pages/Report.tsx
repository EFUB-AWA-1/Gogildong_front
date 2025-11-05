import Header from '@/common/components/Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '@/common/components/ActionButton';

import Step0 from './steps/Step0';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';

export default function Report() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const handleNext = () => {
    if (step === 3) {
      navigate('/school/report/camera');
    } else {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    if (step === 0) navigate(-1);
    else setStep((prev) => prev - 1);
  };

  const titles = ['제보하기', '1/3', '2/3', '3/3'];
  const buttonLabel = step === 0 ? '선택' : step === 3 ? '촬영하기' : '다음';
  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step0 />;

      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
    }
  };
  return (
    <div
      className={`flex flex-col h-full items-center justify-between ${
        step === 0 ? 'bg-white' : 'bg-black'
      }`}>
      <Header
        title={titles[step]}
        onBackClick={handlePrev}
        darkMode={step !== 0}
      />

      <div className='w-full my-20 flex flex-1 justify-center items-center'>
        {renderStep()}
      </div>

      <div className='w-full fixed bottom-0 px-6 py-4'>
        <ActionButton label={buttonLabel} onClick={handleNext} />
      </div>
    </div>
  );
}
