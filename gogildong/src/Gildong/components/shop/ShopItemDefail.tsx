import ActionButton from '@/common/components/ActionButton';
import { buyItem } from '@/Gildong/api/shop';
import type { ShopItem } from '@/Gildong/types/ShopItem';
import axios from 'axios';
import { useState } from 'react';
import NotEnoughCoinModal from '@/Gildong/components/shop/NotEnoughCoinModal';

type Props = {
  item: ShopItem;
  onBack: () => void;
  onBuySuccess: () => void;
};

export default function ShopItemDetail({ item, onBack, onBuySuccess }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleBuy = async () => {
  try {
    setIsLoading(true);
    await buyItem({ itemId: item.itemId });
    
    onBuySuccess();
   
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 409) {
        setIsModalOpen(true); 
        return;
      }
    }

    console.error('아이템 구매 실패', e);
  } finally {
    setIsLoading(false);
  }
};


  return (<>
    <div className="flex flex-col items-center gap-6 pt-8">
      <img
        src={item.wearingItemImage}
        alt={item.name}
        className="h-32 w-32 object-contain"
      />

      <div className="text-center">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="mt-1 text-sm text-zinc-500">{item.price} 코인</p>
      </div>

      <ActionButton label={isLoading ? "구매 중..." : "구매하기"} type="button" onClick={handleBuy} />

      <button onClick={onBack} className="text-sm text-zinc-400">
        목록으로 돌아가기
      </button>
    </div>
    {isModalOpen && (
      <NotEnoughCoinModal
        onClose={() => setIsModalOpen(false)}
      />
    )}</>
  );
}
