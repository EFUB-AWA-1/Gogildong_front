import type { Clothing } from '@/Gildong/types/Clothing';

type ItemResponse = {
  itemId: number;
  name: string;
  type: string;
  itemImage: string;
  wearingItemImage: string;
  equip: boolean;
};

export const mapItemsToClothes = (items: ItemResponse[]): Clothing[] => {
  return items
    .map((item) => ({
      id: item.itemId,
      name: item.name,
      category: item.type === 'head' ? '얼굴' : '옷',
      imageUrl: item.wearingItemImage,
      itemImg: item.itemImage,
      isApplied: item.equip
    }));
};
