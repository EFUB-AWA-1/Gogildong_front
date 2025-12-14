import Header from '@/common/components/Header';
import { getMyCharacterInfo } from '@/Gildong/api/closet';
import DialogueBox from '@/Gildong/components/DialogueBox';
import MenuButtonContainer from '@/Gildong/components/MenuButtonContainer';
import UserInfo from '@/Gildong/components/UserInfo';
import { useCoinStore } from '@/Gildong/stores/useCoinStore';
import { useUserStore } from '@/Mypage/stores/useUserStore';
import { useEffect } from 'react';
import { useCharacterStore } from '@/Gildong/stores/useCharacterStore';
import MyCharacter from '@/Gildong/components/MyCharacter';
import { useNavigate } from 'react-router-dom';
import ShopBottomSheet from '@/Gildong/components/shop/ShopBottomSheet';

export default function ShopPage() {
  const navigate = useNavigate();
  const username = useUserStore((state) => state.user?.username);
  const { coin, fetchCoin } = useCoinStore();
  useEffect(() => {
    getMyCharacterInfo();
    fetchCoin();
  }, []);

  const head = useCharacterStore((state) => state.getItemByType('head'));
  const dress = useCharacterStore((state) => state.getItemByType('dress'));
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-linear-to-b from-lime-50 to-lime-200">
      {/* 작은 화면 대응 CSS */}
      <Header
        title="상점"
        transparentMode={true}
        onBackClick={() => navigate('/gildong')}
      />
      {/* 상단 영역 */}
      <div className="flex flex-none flex-col space-y-5 px-6 pb-6">
        <UserInfo username={username} coin={coin ?? 0} />
        <div className="flex w-full flex-row justify-between">
          <DialogueBox />
          <MenuButtonContainer selected="shop" />
        </div>
      </div>
      {/* 캐릭터 영역 */}
      <div className="flex flex-none items-center justify-center py-4">
        <MyCharacter headImg={head?.imageUrl} dressImg={dress?.imageUrl} />
      </div>
      <ShopBottomSheet />
    </div>
  );
}
