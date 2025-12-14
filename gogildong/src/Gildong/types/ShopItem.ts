export type ShopItem = {
  itemId: number;
  name: string;
  type: 'head' | 'dress';
  price: number;
  itemImage: string;
  wearingItemImage: string;
  hasItem: boolean;
};
