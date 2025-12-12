import Header from '@/common/components/Header';
import CorrectQuizGildong from '../assets/QuizCorrectGildong.png';
import { useLocation, useNavigate } from 'react-router-dom';
import ActionButton from '@/common/components/ActionButton';
import { goToNextUnsolvedQuiz } from '@/Gildong/utils/quizNavigation';

export default function QuizCorrect() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const title = state?.title ?? "";
  const point = state?.point ?? 0;

  const handleNextClick = async () => {
    await goToNextUnsolvedQuiz(navigate);
  };
  
  return (
    <div className="relative flex h-screen flex-col items-center bg-lime-50">
      <Header title={title} transparentMode={true} onBackClick={() => navigate("/gildong")}/>
      <div className="w-full items-center flex-1 overflow-y-auto">
        <div className="m-5 flex flex-col items-center justify-center rounded-2xl bg-white px-5 py-8">
          <img className="h-40 w-28" src={CorrectQuizGildong} />
          <div className="justify-centeroverflow-hidden flex flex-col items-center bg-white p-2.5">
            <div className="h-10 w-60 justify-center text-center">
              <span className="text-xl leading-8 font-semibold text-neon-d">
                정답
              </span>
              <span className="text-xl leading-8 font-semibold text-zinc-800">
                이에요!
              </span>
            </div>
            <div className="justify-start text-center">
              <span className="text-sm leading-5 font-bold text-neon-d">
                {point}
              </span>
              <span className="text-sm leading-5 font-bold text-zinc-800">
                포인트
              </span>
              <span className="text-sm leading-5 font-medium text-zinc-800">
                가 지급되었습니다.
              </span>
            </div>
            <div className="inline-flex items-start justify-center">
              <div
                onClick={() => navigate('/mypage')}
                className="cursor-pointer justify-start text-center text-sm leading-5 font-medium text-zinc-800 underline hover:text-neon-d"
              >
                마이페이지
              </div>
              <div className="justify-start text-center text-sm leading-5 font-medium text-zinc-800">
                에서 확인해 보세요!
              </div>
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
