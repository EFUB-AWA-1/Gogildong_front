import Header from "@/common/components/Header";
import SignupForm from "../components/SignupForm";
import SignupStepIndicator from "../components/SignupStepIndicator";

export default function SignupExternal() {
  return (
    <>
      <Header title="회원가입" />
      <div className="flex flex-col gap-6 px-6">
        <SignupStepIndicator currentStep={2} totalSteps={3} />
        <div className="flex flex-col">
          <p className="text-heading-md">보호자 및 외부인 정보 확인</p>
          <p className="text-heading-sm text-gray-80">
            회원 여부 확인 및 가입을 진행합니다.
          </p>
        </div>
        <SignupForm role="external" />
      </div>
    </>
  );
}
