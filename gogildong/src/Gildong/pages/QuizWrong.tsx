import Header from '@/common/components/Header';
import WrongQuizGildong from '../assets/WrongQuizGildong.png';
import ActionButton from '@/common/components/ActionButton';
import QuizOptionSol from '@/Gildong/components/QuizOptionSol';
import { useLocation, useNavigate } from 'react-router-dom';
import { goToNextUnsolvedQuiz } from '@/Gildong/utils/quizNavigation';

export default function QuizWrong() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const title = state?.title ?? '';

  const handleNextClick = async () => {
    await goToNextUnsolvedQuiz(navigate);
  };

  return (
    <div className="scrollbar-hide relative flex h-screen flex-col items-center overflow-y-auto bg-lime-50 pb-24">
      <Header
        title={title}
        transparentMode={true}
        onBackClick={() => navigate('/gildong')}
      />
      <div className="w-full items-center">
        <div className="m-5 flex flex-col items-center justify-center rounded-2xl bg-white px-5 py-8">
          <img className="h-32 w-32 rounded-[70px]" src={WrongQuizGildong} />
          <div className="justify-centeroverflow-hidden flex flex-col items-center bg-white p-2.5">
            <div className="h-10 w-60 justify-center text-center">
              <span className="text-xl leading-8 font-semibold text-red-500">
                오답
              </span>
              <span className="text-xl leading-8 font-semibold text-zinc-800">
                이에요!
              </span>
            </div>
            <div className="justify-start text-center">
              <span className="text-sm leading-5 font-medium text-zinc-800">
                정답을 확인해볼까요?
              </span>
            </div>
          </div>
        </div>
        <div className="m-5 flex flex-col items-start justify-center rounded-2xl bg-white px-5 py-8">
          <div className="inline-flex w-full items-center justify-between">
            <div className="justify-center text-base leading-6 font-bold text-zinc-800">
              정답 풀이
              <QuizOptionSol {...state} />
            </div>
          </div>
        </div>
      </div>
      <div className="z-index-100 fixed bottom-0 w-full max-w-120 p-4">
        <ActionButton label="다음" type="button" onClick={handleNextClick} />
      </div>
    </div>
  );
}
