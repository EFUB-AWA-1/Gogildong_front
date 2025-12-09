import ActionButton from "@/common/components/ActionButton";
import RadioOptionGroup from "./RadioOptionGroup";
import { useState } from "react";

interface ReportForm2Props {
  onSubmit: (data: {
    gender: string;
    type: string;
    door: string;
  }) => void;
}
export default function ReportForm2({ onSubmit }: ReportForm2Props) {
  const [formData, setFormData] = useState({
    gender: "",
    type: "",
    door: ""
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isComplete = formData.gender && formData.type && formData.door;

  return (
    <div className="flex flex-col gap-6">
      <RadioOptionGroup
        name="gender"
        label="어떤 화장실인가요?"
        options={["여자", "남자"]}
        onChange={(v) => handleChange("gender", v)}
      />

      <RadioOptionGroup
        name="type"
        label="화장실 칸은 어떤 종류인가요?"
        options={["장애인 화장실", "일반 화장실"]}
        onChange={(v) => handleChange("type", v)}
      />

      <RadioOptionGroup
        name="door"
        label="화장실 문은 어떻게 열리나요?"
        options={["미닫이문", "여닫이문", "자동문"]}
        onChange={(v) => handleChange("door", v)}
      />

      <ActionButton
        label="등록"
        disabled={!isComplete}
        onClick={() => onSubmit(formData)}
      />
    </div>
  );
}
