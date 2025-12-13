import { useBottomSheet } from '@/Home/hooks/useBottomSheet';
import { useMemo, useState } from 'react';
import type { Clothing } from '@/Gildong/types/Clothing';
import ClosetFilterSelector from '@/Gildong/components/ClosetFilterSelector';
import ClothingGrid from '@/Gildong/components/ClothingGrid';
import { useCharacterStore } from '@/Gildong/stores/useCharacterStore';

type ClosetBottomSheetProps = {
  clothes: Clothing[];
};

export default function ClosetBottomSheet({ clothes }: ClosetBottomSheetProps) {
  const [selectedFilter, setSelectedFilter] = useState('얼굴');
  const filteredClothes = useMemo(
    () => clothes.filter((c) => c.category === selectedFilter),
    [clothes, selectedFilter]
  );
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

  return (
    <div
      ref={sheetRef}
      className="fixed inset-x-0 bottom-0 left-1/2 z-50 flex w-full max-w-[480px] -translate-x-1/2 touch-none flex-col rounded-t-[1.25rem] border-t border-black/5 bg-linear-to-b from-white to-[#F2F2F2] shadow-[0_-6px_40px_0_rgba(0,0,0,0.10)] select-none"
      style={{
        height: `${height}px`,
        transition: snapping ? 'height 0.22s cubic-bezier(.22,1,.36,1)' : 'none'
      }}
    >
      {/* 드래그 핸들 */}
      <div
        className="bg-transfer flex h-9 w-full shrink-0 flex-col items-center justify-center"
        onMouseDown={onHandleMouseDown}
        onTouchStart={onHandleTouchStart}
        onClick={toggle}
      >
        <div className="h-1 w-18 rounded-sm bg-[#E4E4E4]" />
      </div>

      {/* 필터 */}
      <div className="px-4">
        <ClosetFilterSelector
          selectedFilter={selectedFilter}
          onSelect={setSelectedFilter}
        />
      </div>

      {/* 콘텐츠 */}
      <div
        ref={contentRef}
        className={`scroll-hide mt-4 flex-1 px-4 pt-1 pb-28 ${
          isOpen ? 'overflow-auto' : 'overflow-hidden'
        }`}
      >
        <ClothingGrid
          clothes={filteredClothes}
          onSelect={(clothing) => {
            useCharacterStore.getState().setPreviewItem({
              itemId: clothing.id,
              type: clothing.category, 
              name: clothing.name,
              imageUrl: clothing.itemImg,
            });
          }}
        />
      </div>
    </div>
  );
}
