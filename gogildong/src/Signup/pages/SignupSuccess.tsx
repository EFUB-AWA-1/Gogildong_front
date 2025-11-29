import Header from "@/common/components/Header";
import ActionButton from "@/common/components/ActionButton";
import SignupStepIndicator from "../components/SignupStepIndicator";
import { useLocation, useNavigate } from "react-router-dom";

type SignupSuccessState = {
  name?: string;
};

export default function SignupSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { name } = (state as SignupSuccessState) ?? {};

  return (
    <>
      <Header title="회원가입" />
      <div className="flex min-h-screen flex-col bg-white px-6">
        <div className="mt-6 flex flex-1 flex-col gap-6">
          <SignupStepIndicator currentStep={3} totalSteps={3} />
          <div className="flex flex-col gap-2">
            <p className="text-heading-md text-black">회원가입 완료!</p>
            <p className="text-heading-sm text-gray-60">
              {name ? `${name} 님, 환영해요.` : "회원님, 환영해요."}
            </p>
          </div>
        </div>

        <div className="sticky bottom-0">
          <ActionButton
            label="홈으로"
            onClick={() => navigate("/home")}
            className="rounded-3xl"
          />
        </div>
      </div>
    </>
  );
}
