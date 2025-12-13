import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/common/components/Header';
import React, { useEffect, useState } from 'react';
import RankingMenuBar from '@/Gildong/components/RankingMenuBar';
import RankingBox from '@/Gildong/components/RankingBox';
import NavBar from '../../common/components/NavBar';
import type { NavKey } from '../../common/components/NavBar';
import {
  getAllRankingInAllUser,
  getAllRankingInMySchool,
  getAllSchoolRanking
} from '@/Gildong/api/rank';
import type { RankingItem } from '@/Gildong/types/RankingItem';

export default function AllRankingPage() {
  const navigate = useNavigate();
  const [active, setActive] = React.useState<NavKey>('gildong');
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type') || 'all';
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  useEffect(() => {
    if (!searchParams.get('type')) {
      setSearchParams({ type: 'all' });
      return;
    }
  }, []);
  useEffect(() => {
    if (type === 'all') {
      getAllRankingInAllUser().then((data) => {
        const top5 = data.rankings.map((item: any) => ({
          rank: item.rank,
          name: item.user_name,
          score: item.total_score
        }));
        setRankings(top5);
      });
    }

    if (type === 'campus') {
      getAllRankingInMySchool().then((data) => {
        const top5 = data.rankings.map((item: any) => ({
          rank: item.rank,
          name: item.user_name,
          score: item.total_score
        }));
        setRankings(top5);
      });
    }

    if (type === 'school') {
      getAllSchoolRanking().then((data) => {
        const top5 = data.rankings.map((item: any) => ({
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
  return (
    <div className="scroll-hide relative flex min-h-screen flex-col items-center bg-linear-to-b from-white to-lime-100 pb-24">
      <Header title="랭킹" onBackClick={() => navigate(`/ranking?type=${type}`)} />
      <RankingMenuBar activeType={type} onChangeType={handleChangeType} />
      <div className="w-full items-center gap-2.5">
        <div className="my-2 flex h-12 w-full flex-row items-center justify-between px-4">
          <div className="items-center justify-center text-xl font-semibold text-zinc-800">
            전체 {type === 'school' && '학교'} 랭킹
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

      <div className="fixed right-[1.38rem] bottom-6 left-[1.38rem] z-50">
        <NavBar active={active} onChange={setActive} />
      </div>
    </div>
  );
}
