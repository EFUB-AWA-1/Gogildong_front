import { create } from 'zustand';

export type ItemType = 'head' | 'dress';

export interface EquippedItem {
  itemId: number;
  type: ItemType;
  name: string;
  imageUrl: string;
}

interface CharacterState {
  equippedItems: EquippedItem[];
  previewItems: Partial<Record<ItemType, EquippedItem>>;
  setEquippedItems: (items: EquippedItem[]) => void;
  setPreviewItem: (item: EquippedItem) => void;
  updateItem: (item: EquippedItem) => void;
  clearPreview: () => void;
  getItemByType: (type: ItemType) => EquippedItem | undefined;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  equippedItems: [],
  previewItems: {},
  setEquippedItems: (items) =>
    set({
      equippedItems: items,
      previewItems: {} // 초기화 (새로고침/재진입 대비)
    }),
  setPreviewItem: (item) =>
    set((state) => ({
      previewItems: {
        ...state.previewItems,
        [item.type]: item
      }
    })),
  clearPreview: () => set({ previewItems: {} }),
  updateItem: (item) => {
    const updated = get().equippedItems.map((i) =>
      i.type === item.type ? item : i
    );
    set({ equippedItems: updated });
  },
  getItemByType: (type) => {
    const { previewItems, equippedItems } = get();
    return previewItems[type] ?? equippedItems.find((i) => i.type === type);
  },
  isEquipped: (itemId, type) => {
    return get().equippedItems.some(
      (i) => i.itemId === itemId && i.type === type
    );
  },
  isPreview: (itemId, type) => {
    return get().previewItems[type]?.itemId === itemId;
  }
}));
