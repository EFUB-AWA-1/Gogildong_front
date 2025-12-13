import UserInfo from '@/Gildong/components/UserInfo';
import React, { useEffect, useState } from 'react';
import type { Clothing } from '@/Gildong/types/Clothing';
import DialogueBox from '@/Gildong/components/DialogueBox';
import MenuButtonContainer from '@/Gildong/components/MenuButtonContainer';
import { useUserStore } from '@/Mypage/stores/useUserStore';
import { useCoinStore } from '@/Gildong/stores/useCoinStore';
import Header from '@/common/components/Header';
import ClosetBottomSheet from '@/Gildong/components/ClosetBottomSheet';
import { mapItemsToClothes } from '@/Gildong/utils/mapItemsToClothes';
import { getMyCharacterInfo, getMyClothes } from '@/Gildong/api/closet';
import MyCharacter from '@/Gildong/components/MyCharacter';
import { useCharacterStore } from '@/Gildong/stores/useCharacterStore';

export default function ClosetPage() {
  const username = useUserStore((state) => state.user?.username);
  const { coin, fetchCoin } = useCoinStore();
  const [clothes, setClothes] = React.useState<Clothing[]>([]);
  useEffect(() => {
    const fetchClothes = async () => {
      const res = await getMyClothes();
      const mapped = mapItemsToClothes(res.items);
      setClothes(mapped);
    };
    getMyCharacterInfo();
    fetchClothes();
    fetchCoin();
  }, []);

  const head = useCharacterStore((state) => state.getItemByType('head'));
  const dress = useCharacterStore((state) => state.getItemByType('dress'));

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-linear-to-b from-lime-50 to-lime-200">
      {/* 작은 화면 대응 CSS */}
      <Header title="내 옷장" transparentMode={true} />
      {/* 상단 영역 */}
      <div className="flex flex-none flex-col space-y-5 px-6 pb-6">
        <UserInfo username={username} coin={coin ?? 0} />
        <div className="flex w-full flex-row justify-between">
          <DialogueBox />
          <MenuButtonContainer selected="closet" />
        </div>
      </div>

      {/* 캐릭터 영역 */}
      <div className="flex flex-none items-center justify-center py-4">
        <MyCharacter headImg={head?.imageUrl} dressImg={dress?.imageUrl} />
      </div>
      <ClosetBottomSheet clothes={clothes} />
    </div>
  );
}
