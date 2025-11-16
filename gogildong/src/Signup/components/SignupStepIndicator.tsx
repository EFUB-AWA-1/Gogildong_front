import ProgressIcon from "@/Signup/assets/progress_circle.svg?react";
import { Fragment } from "react";

interface SignupStepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export default function SignupStepIndicator({
  currentStep,
  totalSteps = 3
}: SignupStepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  const getCircleClassName = (step: number) => {
    if (step === currentStep) {
      return "bg-neon-100 border-neon-100 text-white";
    }
    return "bg-gray-10 border-gray-20 text-gray-40";
  };

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, index) => (
        <Fragment key={step}>
          <div
            className={`text-body-bold-xs flex h-5 w-5 items-center justify-center rounded-full border ${getCircleClassName(step)}`}
          >
            {step}
          </div>
          {index < steps.length - 1 && <ProgressIcon />}
        </Fragment>
      ))}
    </div>
  );
}
