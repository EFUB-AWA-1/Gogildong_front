import Header from '@/common/components/Header';
import QuizImage from '../assets/quizImage.png';
import QuizOption from '@/Gildong/components/QuizOption';
import { useEffect, useState } from 'react';
import ActionButton from '@/common/components/ActionButton';
import { getQuizById } from '@/Gildong/api/quiz';
import { useParams } from 'react-router-dom';


type QuizChoice = {
  choice_id : number;
  label: string;
  text: string;
};

export default function QuizPage() {
    const {quizId} = useParams();
    const [quiz, setQuiz] = useState<any>(null);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  useEffect(() => {
    const loadQuiz = async () => {
        const data = await getQuizById(Number(quizId));
        setQuiz(data);
    };
    loadQuiz();
  }, [quizId]);

  if(!quiz) return <div>찾을 수 없는 퀴즈입니다!</div>;

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
      <Header title={quiz.title} transparentMode={true} />
      <div className="w-full items-center">
        <div className="m-5 flex flex-col items-center justify-center rounded-2xl bg-white px-5 py-8">
          <img className="h-36 w-72 rounded-2xl object-cover" src={QuizImage} />
          <div className="flex max-w-72 flex-col items-center gap-2.5 overflow-hidden bg-white p-2.5">
            <div className="justify-centertext-base w-64 leading-6 font-bold text-zinc-800">
              Q{quiz.quiz_id}. {quiz.question}
            </div>
            <div>
              <div className="mt-4 flex w-72 flex-col items-center gap-2.5">
                {quiz.choices.map((item: QuizChoice) => (
                  <QuizOption
                    key={item.choice_id}
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
