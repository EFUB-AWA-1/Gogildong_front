import { useState } from "react";
import FilterSelector from "./FilterSelector";
import BottomSheetContent from "./BottomSheetContent";
import { useBottomSheet } from "../hooks/useBottomSheet";

export default function BottomSheet() {
  const [selectedFilter, setSelectedFilter] = useState("전체");

  const {
    height,
    snapping,
    isOpen,
    sheetRef,
    contentRef,
    onHandleMouseDown,
    onHandleTouchStart,
    toggle,
  } = useBottomSheet(35, 11);

  return (
    <div
      ref={sheetRef}
      className="
        fixed inset-x-0 bottom-0 z-50 shrink-0 left-1/2 -translate-x-1/2
        w-full h-44 max-h-140 max-w-[480px]
        rounded-t-[1.25rem]
        bg-linear-to-b from-white to-[#F2F2F2]
        shadow-[0_-6px_40px_0_rgba(0,0,0,0.10)]
        border-t border-black/5  
        flex flex-col items-center
        touch-none select-none overscroll-y-contain
        will-change-[height]
      "
      style={{
        height: `${height}px`,
        transition: snapping
          ? "height 0.22s cubic-bezier(.22,1,.36,1)"
          : "none",
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="flex flex-col justify-center items-center w-91.75 h-9 
          shrink-0 bg-transfer"
        onMouseDown={onHandleMouseDown}
        onTouchStart={onHandleTouchStart}
        onClick={toggle}
        aria-label="시트 드래그 핸들"
      >
        <div className=" w-18 h-1 rounded-sm bg-[#E4E4E4]" />
      </div>
      <div className="w-full flex flex-col items-center gap-[27px] px-[15px]  ">
        <FilterSelector
          selectedFilter={selectedFilter}
          onSelect={(filter) => setSelectedFilter(filter)}
        />
      </div>

      <div
        ref={contentRef}
        className={`w-full flex-1 px-4 py-3 ${
          isOpen ? "overflow-auto" : "overflow-hidden"
        }`}
      >
        <BottomSheetContent />
      </div>
    </div>
  );
}
