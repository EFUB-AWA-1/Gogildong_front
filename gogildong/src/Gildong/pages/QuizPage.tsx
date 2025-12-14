import Header from '@/common/components/Header';
import QuizImage from '../assets/quizImage.png';
import QuizOption from '@/Gildong/components/quiz/QuizOption';
import { useEffect, useState } from 'react';
import ActionButton from '@/common/components/ActionButton';
import { getQuizList, getQuizById, submitQuizAnswer } from '@/Gildong/api/quiz';
import { useNavigate, useParams } from 'react-router-dom';

type QuizChoice = {
  choice_id: number;
  label: string;
  text: string;
};

export default function QuizPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [alreadySolved, setAlreadySolved] = useState(false);
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  useEffect(() => {
    const loadQuiz = async () => {
      // 전체 퀴즈 상태 확인
      const quizzes = await getQuizList();
      const currentQuiz = quizzes.find(
        (q: any) => q.quiz_id === Number(quizId)
      );

      if (!currentQuiz) {
        alert('퀴즈를 찾을 수 없습니다!');
        navigate('/quiz'); // 목록 페이지로 이동
        return;
      }

      if (currentQuiz.attemptStatus === 'SUBMITTED') {
        // 이미 푼 문제면 접근 막기
        setAlreadySolved(true);
        return;
      }
      const data = await getQuizById(Number(quizId));
      setQuiz(data);
    };
    loadQuiz();
  }, [quizId, navigate]);

  if (alreadySolved) {
    return (
      <div className="flex h-screen items-center justify-center bg-lime-50">
        <div className="rounded-2xl bg-white px-20 py-10 text-center">
          <h2 className="text-xl font-bold text-zinc-800">
            이미 푼 문제입니다.
          </h2>
          <p className="mt-2 mb-5 text-sm text-zinc-600">
            퀴즈를 다시 제출할 수 없습니다.
          </p>
          <ActionButton
            label="길동이 홈으로"
            onClick={() => navigate('/gildong')}
          />
        </div>
      </div>
    );
  }
  if (!quiz) return <div>퀴즈를 불러오는 중입니다...</div>;
  const handleSelect = (label: string) => {
    if (selectedOption === label) {
      // 이미 선택된 옵션을 다시 클릭 → 해제
      setSelectedOption(null);
    } else {
      setSelectedOption(label);
    }
  };

  const handleSumbit = async () => {
    if (!selectedOption) return;

    try {
      const payload = { selectedLabel: selectedOption };
      const res = await submitQuizAnswer(Number(quizId), payload);

      if (res.isCorrect) {
        // 맞았으면 QuizCorrect 페이지로 이동
        navigate('/quiz/correct', {
          state: {
            title: quiz.title,
            point: res.point,
            totalPoints: res.totalPoints
          }
        });
      } else {
        // 틀렸으면 QuizWrong 페이지로 이동
        const quizDataForWrong = {
          title: quiz.title,
          correctAnswer: res.correctAnswer,
          selectedAnswer: res.selectedAnswer,
          optionA: res.descriptionA
            ? quiz.choices.find((c: QuizChoice) => c.label === 'A')?.text
            : '',
          optionB: res.descriptionB
            ? quiz.choices.find((c: QuizChoice) => c.label === 'B')?.text
            : '',
          optionC: res.descriptionC
            ? quiz.choices.find((c: QuizChoice) => c.label === 'C')?.text
            : '',
          optionD: res.descriptionD
            ? quiz.choices.find((c: QuizChoice) => c.label === 'D')?.text
            : '',
          descriptionA: res.descriptionA,
          descriptionB: res.descriptionB,
          descriptionC: res.descriptionC,
          descriptionD: res.descriptionD
        };
        navigate('/quiz/wrong', { state: quizDataForWrong });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="relative flex h-screen flex-col items-center bg-lime-50">
      <Header
        title={
          quiz.title.length > 6 ? quiz.title.slice(0, 6) + '...' : quiz.title
        }
        transparentMode={true}
      />
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
        <ActionButton
          label="제출하기"
          disabled={selectedOption === null}
          onClick={handleSumbit}
          type="submit"
        />
      </div>
    </div>
  );
}
