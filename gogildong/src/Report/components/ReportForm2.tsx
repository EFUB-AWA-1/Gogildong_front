import ActionButton from '@/common/components/ActionButton';
import RadioOptionGroup from './RadioOptionGroup';
import { useMemo, useState } from 'react';
import type { FacilityType } from '@/Report/types/facilityTypes';

interface ReportForm2Props {
  facilityType: FacilityType;
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

const EXTRA_TEXT_BY_TYPE: Partial<
  Record<FacilityType, { name: string; label: string; placeholder?: string }>
> = {
  엘리베이터: {
    name: 'extraDescription',
    label: '시설 추가 설명',
    placeholder: '예) 점심시간엔 장시간 대기, 앞에 문턱 있음 등'
  },
  교실: {
    name: 'extraDescription',
    label: '시설 추가 설명',
    placeholder: '예) 앞문은 뻑뻑해서 잘 안 열림'
  },
  화장실: {
    name: 'extraDescription',
    label: '시설 추가 설명',
    placeholder: '추가 설명을 입력해 주세요'
  }
};

export default function ReportForm2({
  facilityType,
  onSubmit
}: ReportForm2Props) {
  const questions = useMemo(
    () => QUESTION_BY_TYPE[facilityType] ?? [],
    [facilityType]
  );
  const extraText = useMemo(
    () => EXTRA_TEXT_BY_TYPE[facilityType],
    [facilityType]
  );

  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
          onChange={(v) => handleChange(q.name, v)}
        />
      ))}

      {extraText && (
        <div className="flex flex-col gap-2">
          <p className="text-body-bold-md text-black">{extraText.label}</p>
          <input
            type="text"
            className="w-full rounded-[1.25rem] border border-gray-40 px-[23px] py-[19px] text-caption-lg text-black outline-none"
            placeholder={extraText.placeholder ?? ''}
            value={formData[extraText.name] ?? ''}
            onChange={(e) => handleChange(extraText.name, e.target.value)}
          />
        </div>
      )}

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
