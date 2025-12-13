import Header from '@/common/components/Header';
import React from 'react';
import RankingMenuBar from '@/Gildong/components/RankingMenuBar';
import SmallArrow from '../assets/smallArraw.svg';
import RankingBox from '@/Gildong/components/RankingBox';
import MyRankingBox from '@/Gildong/components/MyRankingBox';
import { useUserStore } from '@/Mypage/stores/useUserStore';
import NavBar from '../../common/components/NavBar';
import type { NavKey } from '../../common/components/NavBar';

export default function RankingPage() {
  const [active, setActive] = React.useState<NavKey>('gildong');
  const username = useUserStore((state) => state.user?.username);
  return (
    <div className="relative flex min-h-screen pb-24 flex-col items-center bg-linear-to-b from-white to-lime-100 scroll-hide">
      <Header title="랭킹" />
      <RankingMenuBar />
      <div className="w-full items-center gap-2.5">
        <div className="my-2 flex h-12 w-full flex-row items-center justify-between px-4">
          <div className="items-center justify-center text-xl font-semibold text-zinc-800">
            전체 랭킹
          </div>
          <div className="flex h-6 w-14 cursor-pointer flex-row items-center justify-center gap-2">
            <div className="justify-start text-xs font-semibold text-neutral-400">
              더 보기
            </div>
            <div className="">
              <img src={SmallArrow} />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 px-4">
          <RankingBox ranking={1} nickname="안녕자두야" point={12} />
          <RankingBox ranking={2} nickname="안녕자두야" point={1200} />
          <RankingBox ranking={3} nickname="안녕자두야" point={12} />
          <RankingBox ranking={4} nickname="안녕자두야" point={12} />
          <RankingBox ranking={5} nickname="안녕자두야" point={12} />
        </div>
      </div>
      <div className="mt-4 flex w-full flex-col items-center">
        <div className="inline-flex h-12 items-center justify-between self-stretch px-4">
          <div className="justify-center text-xl font-semibold text-zinc-800">
            내 랭킹
          </div>
        </div>
        <div className="my-1 w-full px-4">
          <MyRankingBox
            nickname={username}
            myRanking={2004}
            globalPercent={56.3}
          />
        </div>
      </div>
      <div className="fixed right-[1.38rem] bottom-6 left-[1.38rem] z-50">
        <NavBar active={active} onChange={setActive} />
      </div>
    </div>
  );
}
