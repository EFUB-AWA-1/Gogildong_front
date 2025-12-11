import Header from '@/common/components/Header';
import QuizImage from '../assets/quizImage.png';
import QuizOption from '@/Gildong/components/QuizOption';
import { useState } from 'react';
import ActionButton from '@/common/components/ActionButton';

export default function QuizPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const mockdata = [
    {
      label: 'A',
      text: '건물 입구에 계단만 설치'
    },
    {
      label: 'B',
      text: '엘리베이터와 경사로 설치'
    },
    {
      label: 'C',
      text: '글자가 작은 안내판 설치'
    },
    {
      label: 'D',
      text: '휠체어 사용자를 위한 화장실 미설치'
    }
  ];

  const handleSelect = (label: string) => {
    if (selectedOption === label) {
      // 이미 선택된 옵션을 다시 클릭 → 해제
      setSelectedOption(null);
    } else {
      setSelectedOption(label);
    }
  };

  const handleSumbit = () =>{
    console.log("제출함!");
  };
  return (
    <div className="relative flex h-screen flex-col items-center bg-lime-50">
      <Header title="퀴즈 1" transparentMode={true} />
      <div className="w-full items-center">
        <div className="m-5 flex flex-col items-center justify-center rounded-2xl bg-white px-5 py-8">
          <img className="h-36 w-72 rounded-2xl object-cover" src={QuizImage} />
          <div className="flex max-w-72 flex-col items-center gap-2.5 overflow-hidden bg-white p-2.5">
            <div className="justify-centertext-base w-64 leading-6 font-bold text-zinc-800">
              Q1. 다음 중 베리어프리 설계에 해당하는 것은 무엇일까요?
            </div>
            <div>
              <div className="mt-4 flex w-72 flex-col items-center gap-2.5">
                {mockdata.map((item) => (
                  <QuizOption
                    key={item.label}
                    label={item.label}
                    option={item.text}
                    isSelected={selectedOption === item.label}
                    onSelect={() => handleSelect(item.label)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-index-100 fixed bottom-0 w-full max-w-120 p-4">
        <ActionButton label="제출하기" disabled={selectedOption === null}
        onClick={handleSumbit} type="submit" />
      </div>
    </div>
  );
}
