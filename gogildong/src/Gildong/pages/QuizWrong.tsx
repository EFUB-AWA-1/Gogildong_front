import Header from '@/common/components/Header';
import WrongQuizGildong from '../assets/WrongQuizGildong.png';
import ActionButton from '@/common/components/ActionButton';
import QuizOptionSol from '@/Gildong/components/QuizOptionSol';

export default function QuizWrong() {
  const mockData = {
    correctAnswer: 'C',
    selectedAnswer: 'B',
    optionA: "건물 입구에 계단만 설치",
    optionB: "엘리베이터와 경사로 설치",
    optionC: "글자가 적은 안내판 설치",
    optionD: "휠체어 이용자를 위한 화장실 미설치",
    descriptionA: '계단만 있으면 휠체어·유모차 이용자가 진입할 수 없어 배리어프리에 위배됩니다.',
    descriptionB: '계단 외에도 경사로나 엘리베이터를 함께 설치하면 이동 약자도 자유롭게 이동할 수 있어 배리어프리 설계에 해당합니다.',
    descriptionC: '시각 장애인이나 저시력자에게 불편을 주어 배리어프리 원칙에 어긋납니다.',
    descriptionD: '화장실 접근성이 떨어져 역시 배리어프리와는 반대되는 사례입니다.'
  };
  return (
    <div className="relative flex h-screen flex-col items-center bg-lime-50 overflow-y-auto pb-24 scrollbar-hide">
      <Header title="퀴즈1" transparentMode={true} />
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
              <QuizOptionSol {...mockData} />
            </div>
          </div>
        </div>
      </div>
      <div className="z-index-100 fixed bottom-0 w-full max-w-120 p-4">
        <ActionButton label="다음" type="submit" />
      </div>
    </div>
  );
}
