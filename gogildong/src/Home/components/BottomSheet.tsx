import { useEffect, useRef, useState } from "react";

export default function BottomSheet() {
  const remToPx = (rem: number) =>
    rem *
    parseFloat(getComputedStyle(document.documentElement).fontSize || "16");

  const OPEN_REM = 35;
  const CLOSED_REM = 11;
  const OPEN_PX = remToPx(OPEN_REM);
  const CLOSED_PX = remToPx(CLOSED_REM);

  const sheetRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const startY = useRef(0);
  const startH = useRef(CLOSED_PX);
  const dragging = useRef(false);
  const prevBodyOverscroll = useRef<string>("auto");

  const [height, setHeight] = useState(CLOSED_PX);
  const [snapping, setSnapping] = useState(false);

  const isOpen = height > CLOSED_PX + 1;
  const clamp = (v: number) => Math.min(OPEN_PX, Math.max(CLOSED_PX, v));

  const lockOverscroll = () => {
    prevBodyOverscroll.current = document.body.style.overscrollBehaviorY || "";
    document.body.style.overscrollBehaviorY = "contain";
  };
  const unlockOverscroll = () => {
    document.body.style.overscrollBehaviorY = prevBodyOverscroll.current;
  };

  const onPointerDown = (clientY: number, e?: Event) => {
    if (!sheetRef.current) return;
    dragging.current = true;
    setSnapping(false);
    startY.current = clientY;
    startH.current = height;
    lockOverscroll();
    if (e && "preventDefault" in e) (e as Event).preventDefault();
  };

  const onPointerMove = (clientY: number, e?: Event) => {
    if (!dragging.current) return;
    const dy = startY.current - clientY;
    const next = clamp(startH.current + dy);
    setHeight(next);
    if (e && "preventDefault" in e) (e as Event).preventDefault();
  };

  const snap = (finalHeight: number) => {
    setSnapping(true);
    setHeight(clamp(finalHeight));
    window.setTimeout(() => setSnapping(false), 220);
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    unlockOverscroll();
    const mid = (OPEN_PX + CLOSED_PX) / 2;
    snap(height >= mid ? OPEN_PX : CLOSED_PX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientY, e);
    const handleMouseUp = () => onPointerUp();

    window.addEventListener("mousemove", handleMouseMove, { passive: false });
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [height]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      const t = e.touches[0];
      onPointerMove(t.clientY, e);
    };
    const handleTouchEnd = () => onPointerUp();

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove as any);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [height]);

  const onHandleMouseDown = (e: React.MouseEvent) =>
    onPointerDown(e.clientY, e.nativeEvent);
  const onHandleTouchStart = (e: React.TouchEvent) =>
    onPointerDown(e.touches[0].clientY, e.nativeEvent);

  const toggle = () => snap(isOpen ? CLOSED_PX : OPEN_PX);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    let touchStartY = 0;
    const PULL_CLOSE_THRESHOLD = 28;

    const onContentTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onContentTouchMove = (e: TouchEvent) => {
      if (!isOpen) return;
      const atTop = el.scrollTop <= 0;
      const curY = e.touches[0].clientY;
      const delta = curY - touchStartY;

      if (atTop && delta > PULL_CLOSE_THRESHOLD) {
        e.preventDefault();
        snap(CLOSED_PX);
      }
    };

    el.addEventListener("touchstart", onContentTouchStart, { passive: true });
    el.addEventListener("touchmove", onContentTouchMove, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onContentTouchStart);
      el.removeEventListener("touchmove", onContentTouchMove);
    };
  }, [isOpen, CLOSED_PX]);

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
        <div
          className=" w-18 h-1 
          rounded-sm
          bg-[#E4E4E4]"
        />
      </div>

      <div
        ref={contentRef}
        className={`w-full flex-1 px-4 py-3 ${
          isOpen ? "overflow-auto" : "overflow-hidden"
        }`}
      >
        <div className="h-[1200px] opacity-70 text-sm">
          콘텐츠 영역 (스크롤 가능)
        </div>
      </div>
    </div>
  );
}
