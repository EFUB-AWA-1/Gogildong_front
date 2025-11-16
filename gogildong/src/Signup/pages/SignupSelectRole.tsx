import { useState } from "react";
import Header from "@/common/components/Header";
import ActionButton from "@/common/components/ActionButton";
import SignupStepIndicator from "../components/SignupStepIndicator";
import type { SignupRoleOptionItem } from "../components/SignupRoleOptions";
import SignupRoleOptions from "../components/SignupRoleOptions";

const PURPOSE_OPTIONS: SignupRoleOptionItem[] = [
  {
    id: "manager",
    title: "학교 관리자",
    description: "담당하는 학교 전체 정보와 외부인의 열람 여부를 관리해요."
  },
  {
    id: "member",
    title: "학교 구성원",
    description:
      "내가 다니는 학교의 이동 편의 정보를 등록하거나 확인하고 싶어요."
  },
  {
    id: "guardian",
    title: "보호자 및 외부인",
    description:
      "시험, 진학 등의 목적으로 특정 학교의 이동 편의 정보를 확인하고 싶어요."
  }
];

export default function SignupSelectRole() {
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const handleNext = () => {
    if (!selectedPurpose) return;
    // TODO: 연결된 다음 단계 이동
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="회원가입" />
      <section className="flex flex-1 flex-col gap-6 px-5 py-6">
        <SignupStepIndicator currentStep={1} totalSteps={3} />
        <div className="flex flex-col gap-2">
          <p className="text-heading-md text-black">
            가입 목적을 <br />
            선택해 주세요
          </p>
        </div>
        <SignupRoleOptions
          options={PURPOSE_OPTIONS}
          selectedId={selectedPurpose}
          onSelect={setSelectedPurpose}
        />
      </section>
      <div className="mt-auto w-full bg-white px-5 pt-4 pb-8">
        <ActionButton
          label="다음"
          onClick={handleNext}
          disabled={!selectedPurpose}
        />
      </div>
    </div>
  );
}
