import { useEffect, useMemo, useRef, useState } from "react";

export function useBottomSheet(openRem = 35, closedRem = 11) {
  const remToPx = (rem: number) =>
    rem *
    parseFloat(getComputedStyle(document.documentElement).fontSize || "16");

  const OPEN_PX = useMemo(() => remToPx(openRem), [openRem]);
  const CLOSED_PX = useMemo(() => remToPx(closedRem), [closedRem]);

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

  const onPointerDownCore = (clientY: number, e?: Event) => {
    if (!sheetRef.current) return;
    dragging.current = true;
    setSnapping(false);
    startY.current = clientY;
    startH.current = height;
    lockOverscroll();
    if (e && "preventDefault" in e) (e as Event).preventDefault();
  };

  const onPointerMoveCore = (clientY: number, e?: Event) => {
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

  const onPointerUpCore = () => {
    if (!dragging.current) return;
    dragging.current = false;
    unlockOverscroll();
    const mid = (OPEN_PX + CLOSED_PX) / 2;
    snap(height >= mid ? OPEN_PX : CLOSED_PX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => onPointerMoveCore(e.clientY, e);
    const handleMouseUp = () => onPointerUpCore();

    window.addEventListener("mousemove", handleMouseMove, { passive: false });
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [height, OPEN_PX, CLOSED_PX]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      const t = e.touches[0];
      onPointerMoveCore(t.clientY, e);
    };
    const handleTouchEnd = () => onPointerUpCore();

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove as any);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [height, OPEN_PX, CLOSED_PX]);

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
  }, [isOpen, OPEN_PX, CLOSED_PX]);

  const onHandleMouseDown = (e: React.MouseEvent) =>
    onPointerDownCore(e.clientY, e.nativeEvent);
  const onHandleTouchStart = (e: React.TouchEvent) =>
    onPointerDownCore(e.touches[0].clientY, e.nativeEvent);

  const toggle = () => snap(isOpen ? CLOSED_PX : OPEN_PX);

  return {
    height,
    snapping,
    isOpen,
    sheetRef,
    contentRef,
    onHandleMouseDown,
    onHandleTouchStart,
    toggle
  };
}
