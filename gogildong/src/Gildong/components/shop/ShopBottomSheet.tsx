import { getAllItem } from '@/Gildong/api/shop';
import { useBottomSheet } from '@/Home/hooks/useBottomSheet';
import { useEffect, useState } from 'react';
import type { ShopItem } from '@/Gildong/types/ShopItem';
import ShopItemGrid from '@/Gildong/components/shop/ShopItemGrid';
import ClosetFilterSelector from '@/Gildong/components/closet/ClosetFilterSelector';
import { useCharacterStore } from '@/Gildong/stores/useCharacterStore';
import ShopItemDetail from './ShopItemDefail';
import { useCoinStore } from '@/Gildong/stores/useCoinStore';

const FILTER_MAP = {
  얼굴: 'head',
  옷: 'dress'
} as const;

export default function ShopBottomSheet() {
  const [selectedFilter, setSelectedFilter] =
    useState<keyof typeof FILTER_MAP>('얼굴');
  const [items, setItems] = useState<ShopItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const type = FILTER_MAP[selectedFilter];
  const fetchCoin = useCoinStore((state) => state.fetchCoin);
  const setPreviewItem = useCharacterStore((state) => state.setPreviewItem);
  const fetchItems = async () => {
    const data = await getAllItem(type);
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, [type]);
  const handleSelectItem = (item: ShopItem) => {
    setSelectedItem(item);

    setPreviewItem({
      itemId: item.itemId,
      type: item.type,
      name: item.name,
      imageUrl: item.itemImage
    });
  };
  const {
    height,
    snapping,
    isOpen,
    sheetRef,
    contentRef,
    onHandleMouseDown,
    onHandleTouchStart,
    toggle
  } = useBottomSheet(32, 18);

  const handleBuySuccess = async () => {
    await fetchCoin();
    await fetchItems();
    setSelectedItem(null);
  };
  return (
    <div
      ref={sheetRef}
      className="fixed inset-x-0 bottom-0 left-1/2 z-50 flex w-full max-w-[480px] -translate-x-1/2 flex-col rounded-t-[1.25rem] bg-linear-to-b from-white to-[#F2F2F2]"
      style={{
        height: `${height}px`,
        transition: snapping ? 'height 0.22s cubic-bezier(.22,1,.36,1)' : 'none'
      }}
    >
      {/* 드래그 핸들 */}
      <div
        className="flex h-9 items-center justify-center"
        onMouseDown={onHandleMouseDown}
        onTouchStart={onHandleTouchStart}
        onClick={toggle}
      >
        <div className="h-1 w-18 rounded-sm bg-[#E4E4E4]" />
      </div>
      {/* 필터 */}
      {!selectedItem && (
        <div className="px-4">
          <ClosetFilterSelector
            selectedFilter={selectedFilter}
            onSelect={setSelectedFilter}
          />
        </div>
      )}
      {/* 콘텐츠 */}
      <div
        ref={contentRef}
        className={`mt-4 flex-1 px-4 pb-28 ${
          isOpen ? 'overflow-auto' : 'overflow-hidden'
        }`}
      >
        {selectedItem ? (
          <ShopItemDetail
            item={selectedItem}
            onBack={() => setSelectedItem(null)}
            onBuySuccess={handleBuySuccess}
          />
        ) : (
          <ShopItemGrid items={items} onSelect={handleSelectItem} />
        )}
      </div>
    </div>
  );
}
