import Header from '@/common/components/Header';
import React, { useEffect, useState } from 'react';
import RankingMenuBar from '@/Gildong/components/RankingMenuBar';
import SmallArrow from '../assets/smallArraw.svg';
import RankingBox from '@/Gildong/components/RankingBox';
import MyRankingBox from '@/Gildong/components/MyRankingBox';
import NavBar from '../../common/components/NavBar';
import type { NavKey } from '../../common/components/NavBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  getAllRankingInAllUser,
  getAllRankingInMySchool,
  getAllSchoolRanking,
  getMyRankingInAllUser,
  getMyRankingInMySchool,
  getMySchoolRanking
} from '@/Gildong/api/rank';
import type { RankingItem } from '@/Gildong/types/RankingItem';

type MyRanking = {
  name: string;
  rank: number;
  percentile: number;
};

export default function RankingPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = React.useState<NavKey>('gildong');
  const type = searchParams.get('type') || 'all';
  const [myRanking, setMyRanking] = useState<MyRanking>({
    name: '',
    rank: 0,
    percentile: 0
  });
  const [rankings, setRankings] = useState<RankingItem[]>([]);

  useEffect(() => {
    if (!searchParams.get('type')) {
      setSearchParams({ type: 'all' });
      return;
    }
  }, []);

  useEffect(() => {
    if (type === 'all') {
      getMyRankingInAllUser().then((data) =>
        setMyRanking({
          name: data.user_name,
          rank: data.global_rank,
          percentile: data.global_percentile
        })
      );
      getAllRankingInAllUser().then((data) => {
        const top5 = data.rankings.slice(0, 5).map((item: any) => ({
          rank: item.rank,
          name: item.user_name,
          score: item.total_score
        }));
        setRankings(top5);
      });
    }

    if (type === 'campus') {
      getMyRankingInMySchool().then((data) =>
        setMyRanking({
          name: data.user_name,
          rank: data.my_rank,
          percentile: data.my_percentile
        })
      );
      getAllRankingInMySchool().then((data) => {
        const top5 = data.rankings.slice(0, 5).map((item: any) => ({
          rank: item.rank,
          name: item.user_name,
          score: item.total_score
        }));
        setRankings(top5);
      });
    }

    if (type === 'school') {
      getMySchoolRanking().then((data) =>
        setMyRanking({
          name: data.school_name,
          rank: data.school_rank,
          percentile: data.school_percentile
        })
      );
      getAllSchoolRanking().then((data) => {
        const top5 = data.rankings.slice(0, 5).map((item: any) => ({
          rank: item.rank,
          name: item.school_name,
          score: item.total_score
        }));
        setRankings(top5);
      });
    }
  }, [type]);

  const handleChangeType = (newType: string) => {
    setSearchParams({ type: newType });
  };

  const goToAllRanking = () => navigate(`/ranking/all?type=${type}`);
  return (
    <div className="scroll-hide relative flex min-h-screen flex-col items-center bg-linear-to-b from-white to-lime-100 pb-24">
      <Header title="랭킹" onBackClick={() => navigate('/gildong')} />
      <RankingMenuBar activeType={type} onChangeType={handleChangeType} />
      <div className="w-full items-center gap-2.5">
        <div className="my-2 flex h-12 w-full flex-row items-center justify-between px-4">
          <div className="items-center justify-center text-xl font-semibold text-zinc-800">
            전체 {type==='school' && "학교"} 랭킹
          </div>
          <div onClick={goToAllRanking} className="flex h-6 w-14 cursor-pointer flex-row items-center justify-center gap-2">
            <div className="justify-start text-xs font-semibold text-neutral-400">
              더 보기
            </div>
            <div className="">
              <img src={SmallArrow} />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 px-4">
          {rankings.map((item) => (
            <RankingBox
              key={item.rank}
              ranking={item.rank}
              nickname={item.name}
              point={item.score}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex w-full flex-col items-center">
        <div className="inline-flex h-12 items-center justify-between self-stretch px-4">
          <div className="justify-center text-xl font-semibold text-zinc-800">
            내 랭킹
          </div>
        </div>
        {myRanking && (
          <div className="my-1 w-full px-4">
            <MyRankingBox
              nickname={myRanking.name}
              myRanking={myRanking.rank}
              globalPercent={myRanking.percentile}
            />
          </div>
        )}
      </div>

      <div className="fixed right-[1.38rem] bottom-6 left-[1.38rem] z-50">
        <NavBar active={active} onChange={setActive} />
      </div>
    </div>
  );
}
