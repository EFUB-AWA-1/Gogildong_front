import RankingMenu from '@/Gildong/components/RankingMenu';
import { useState } from 'react';

const menuTitles = ['전체', '교내', '학교'];

export default function RankingMenuBar() {
  const [selectedTitle, setSelectedTitle] = useState("전체");

  return (
    <div className="flex w-full flex-row items-center justify-center gap-5 bg-white px-4">
      {menuTitles.map((title) => (
        <RankingMenu
          key={title}
          title={title}
          selected={selectedTitle === title}
          onClick={() => setSelectedTitle(title)}
        />
      ))}
    </div>
  );
}
