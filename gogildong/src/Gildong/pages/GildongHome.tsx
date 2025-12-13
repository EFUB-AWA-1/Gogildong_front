import UserInfo from '@/Gildong/components/UserInfo';
import React, { useEffect } from 'react';
import NavBar from '../../common/components/NavBar';
import type { NavKey } from '../../common/components/NavBar';
import DialogueBox from '@/Gildong/components/DialogueBox';
import MenuButtonContainer from '@/Gildong/components/MenuButtonContainer';
import { useUserStore } from '@/Mypage/stores/useUserStore';
import QuizIcon from '../assets/QuizIcon.svg';
import MissonIcon from '../assets/MissonIcon.svg';
import { useCoinStore } from '@/Gildong/stores/useCoinStore';
import { useNavigate } from 'react-router-dom';
import { getQuizList } from '@/Gildong/api/quiz';
import MissionCompleteTag from '@/Gildong/components/MissionCompleteTag';
import MissionProgress from '@/Gildong/components/MissionProgress';
import { goToNextUnsolvedQuiz } from '@/Gildong/utils/quizNavigation';
import MyCharacter from '@/Gildong/components/MyCharacter';
import { getMyCharacterInfo } from '@/Gildong/api/closet';
import { useCharacterStore } from '@/Gildong/stores/useCharacterStore';

type Quiz = {
  quiz_id: number;
  title: string;
  attemptStatus: 'SUBMITTED' | 'NONE';
  isCorrect: boolean | null;
};

export default function GildongHome() {
  const navigate = useNavigate();
  const [active, setActive] = React.useState<NavKey>('gildong');
  const username = useUserStore((state) => state.user?.username);
  const { coin, fetchCoin } = useCoinStore();
  const [quizProgress, setQuizProgress] = React.useState({
    solved: 0,
    total: 0
  });

  useEffect(() => {
    const loadQuizProgress = async () => {
      const quizzes = await getQuizList();
      const solvedCount = quizzes.filter(
        (q: Quiz) => q.attemptStatus === 'SUBMITTED'
      ).length;

      setQuizProgress({
        solved: solvedCount,
        total: quizzes.length
      });
    };
    getMyCharacterInfo();
    loadQuizProgress();
    fetchCoin();
  }, []);
  const isQuizCompleted =
    quizProgress.total > 0 && quizProgress.solved === quizProgress.total;
  const goToQuiz = async () => {
    await goToNextUnsolvedQuiz(navigate);
  };

  const head = useCharacterStore((state) => state.getItemByType('head'));
  const dress = useCharacterStore((state) => state.getItemByType('dress'));

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-linear-to-b from-lime-50 to-lime-200">
      {/* 작은 화면 대응 CSS */}
      <style>
        {`
        @media (max-height: 700px) {
          .compact-card {
            padding: 12px !important;
          }
          .compact-emoji {
            display: none !important;
          }
          .compact-text {
            font-size: 0.8rem !important;
            line-height: 1rem;import { Navigate, useNavigate } from 'react-router-dom';

          }
        }
        `}
      </style>
      {/* 상단 영역 */}
      <div className="flex flex-none flex-col space-y-5 px-6 pt-15 pb-6">
        <UserInfo username={username} coin={coin ?? 0} />
        <div className="flex w-full flex-row justify-between">
          <DialogueBox />
          <MenuButtonContainer />
        </div>
      </div>

      {/* 캐릭터 영역 */}
      <div className="flex flex-none items-center justify-center py-4">
        <MyCharacter headImg={head?.imageUrl} dressImg={dress?.imageUrl} />
      </div>

      {/* 미션 카드 영역 */}
      <div className="flex w-full flex-grow flex-col overflow-hidden rounded-t-3xl bg-white px-5 py-6 pb-32">
        <h2 className="compact-text mb-4 text-xl font-semibold">
          미션 진행하기
        </h2>

        <div className="grid flex-grow grid-cols-2 gap-4">
          {/* 오늘의 미션 */}
          <div className="compact-card flex flex-col items-center justify-between rounded-2xl bg-[#E7F8B7] p-5">
            <p className="compact-text mb-2 text-center text-lg leading-6 font-medium">
              오늘의 미션
              <br />
              확인하기
            </p>

            {/* 이모지 — 작은 화면에서는 숨김 */}
            <div className="compact-emoji mb-2 text-4xl">
              <img src={MissonIcon} />
            </div>

            <p className="compact-text font-semibold text-green-600">3/3</p>
            <MissionCompleteTag />
          </div>

          {/* 퀴즈 */}
          <div
            onClick={goToQuiz}
            className="compact-card flex flex-col items-center justify-between rounded-2xl bg-[#EDEDED] p-5"
          >
            <p className="compact-text text-center text-lg leading-6 font-medium">
              퀴즈 풀고
              <br />
              <span className="font-bold">코인 </span>받기
            </p>

            <div className="compact-emoji text-4xl">
              <img src={QuizIcon} />
            </div>

            <p className="compact-text font-semibold text-green-600">
              {quizProgress.solved}/{quizProgress.total}
            </p>

            {isQuizCompleted ? <MissionCompleteTag /> : <MissionProgress />}
          </div>
        </div>
      </div>

      {/* nav bar */}
      <div className="fixed right-[1.38rem] bottom-6 left-[1.38rem] z-50">
        <NavBar active={active} onChange={setActive} />
      </div>
    </div>
  );
}
