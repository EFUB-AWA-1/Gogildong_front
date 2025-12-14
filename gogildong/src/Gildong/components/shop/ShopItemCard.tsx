import type { ShopItem } from '@/Gildong/types/ShopItem';

type Props = {
  item: ShopItem;
  onSelect: (item: ShopItem) => void;
};

export default function ShopItemCard({ item, onSelect }: Props) {
  const isOwned = item.hasItem;

  return (
    <button
      className="flex flex-col items-center gap-2"
      onClick={() => {
        if (!isOwned) onSelect(item);
      }}
    >
      <div
        className={`relative flex h-28 w-28 items-center justify-center rounded-[20px] bg-white shadow ${isOwned ? 'opacity-50' : ''}`}
      >
        <img
          src={item.wearingItemImage}
          alt={item.name}
          className="h-20 w-20 object-contain"
        />

        {isOwned && (
          <span className="absolute bottom-2 text-xs text-zinc-400">
            보유 중
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{item.name}</span>
        <span className="text-xs text-zinc-500">{item.price} 코인</span>
      </div>
    </button>
  );
}
