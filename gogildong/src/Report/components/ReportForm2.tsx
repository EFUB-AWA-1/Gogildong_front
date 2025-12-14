import ActionButton from '@/common/components/ActionButton';
import RadioOptionGroup from './RadioOptionGroup';
import { useEffect, useMemo, useState } from 'react';
import type { FacilityType } from '@/Report/types/facilityTypes';

interface ReportForm2Props {
  facilityType: FacilityType;
  initialValues?: Record<string, string>;
  onChange?: (data: Record<string, string>) => void;
  onSubmit: (data: Record<string, string>) => void;
}

type QuestionConfig = {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
};

const QUESTION_BY_TYPE: Record<FacilityType, QuestionConfig[]> = {
  화장실: [
    { name: 'gender', label: '어떤 화장실인가요?', options: ['여자', '남자'] },
    {
      name: 'stallType',
      label: '화장실 칸은 어떤 종류인가요?',
      options: ['장애인 화장실', '일반 화장실']
    },
    {
      name: 'doorType',
      label: '화장실 문은 어떻게 열리나요?',
      options: ['미닫이문', '여닫이문', '자동문']
    },
    {
      name: 'grabBar',
      label: '변기 손잡이가 있나요?',
      options: ['손잡이 있음', '손잡이 없음']
    }
  ],
  엘리베이터: [
    {
      name: 'accessApproval',
      label: '교직원 승인 없이 누구나 이용할 수 있나요?',
      options: ['이용 가능', '제한 있음', '모르겠음']
    },
    {
      name: 'classUse',
      label: '수업시간에도 이용 가능한가요?',
      options: ['이용 가능', '제한 있음']
    }
  ],
  교실: [
    {
      name: 'threshold',
      label: '교실 문 턱이 있나요?',
      options: ['턱 있음', '턱 없음']
    },
    {
      name: 'doorType',
      label: '교실 문은 어떻게 열리나요?',
      options: ['양쪽 여닫이문', '단일 여닫이문', '미닫이 문']
    }
  ],
  기타: []
};

export default function ReportForm2({
  facilityType,
  initialValues,
  onChange,
  onSubmit
}: ReportForm2Props) {
  const questions = useMemo(
    () => QUESTION_BY_TYPE[facilityType] ?? [],
    [facilityType]
  );

  const [formData, setFormData] = useState<Record<string, string>>(
    initialValues ?? {}
  );

  useEffect(() => {
    setFormData(initialValues ?? {});
  }, [facilityType, initialValues]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      onChange?.(next);
      return next;
    });
  };

  const isComplete =
    questions.length === 0
      ? true
      : questions.every((q) => {
          if (q.required === false) return true;
          return Boolean(formData[q.name]);
        });

  return (
    <div className="flex flex-col gap-6">
      {questions.map((q) => (
        <RadioOptionGroup
          key={q.name}
          name={q.name}
          label={q.label}
          options={q.options}
          selectedValue={formData[q.name]}
          onChange={(v) => handleChange(q.name, v)}
        />
      ))}

      <div className="sticky bottom-0 py-4">
        <ActionButton
          label="등록"
          disabled={!isComplete}
          onClick={() => onSubmit(formData)}
        />
      </div>
    </div>
  );
}
