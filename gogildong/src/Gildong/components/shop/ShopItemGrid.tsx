import type { ShopItem } from '@/Gildong/types/ShopItem';
import ShopItemCard from '@/Gildong/components/shop/ShopItemCard';

type Props = {
  items: ShopItem[];
  onSelect: (item: ShopItem) => void;
};

export default function ShopItemGrid({ items, onSelect }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <ShopItemCard key={item.itemId} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}
