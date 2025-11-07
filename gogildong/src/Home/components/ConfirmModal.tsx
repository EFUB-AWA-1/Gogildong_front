import { useEffect } from "react";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm?: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "확인",
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      {/* 모달 카드 */}
      <div
        className="
          w-75
          rounded-[1.25rem] bg-white
          pt-5.25 pr-11 pb-5 pl-10.75
          shadow-[0_0_12px_rgba(170,235,47,0.30)]
          flex flex-col items-center gap-4
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* 제목+내용*/}
        <div className="flex w-53.25 flex-col items-center gap-4 shrink-0">
          <div className="w-full text-center text-black text-[1.125rem] font-bold leading-6.75">
            {title}
          </div>
          <div className="h-21 w-full text-center text-black text-[0.875rem] font-medium leading-5.25 whitespace-pre-line">
            {message}
          </div>
        </div>

        <button
          className="
            w-18 h-9 rounded-[1.25rem] bg-neon-100
            flex items-center justify-center cursor-pointer
            text-black text-[0.875rem] font-bold leading-5.25
          "
          onClick={() => {
            onConfirm?.();
            onClose();
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}
