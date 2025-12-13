import { useEffect } from 'react';

type SingleBtnModalProps = {
  open: boolean;
  title: string;
  message?: string;
  label?: string;
  onClose: () => void;
  onConfirm?: () => void;
};

export default function SingleBtnModal({
  open,
  title,
  message,
  label,
  onClose,
  onConfirm
}: SingleBtnModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.classList.add('overflow-hidden');
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('overflow-hidden');
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
        className="flex w-75 flex-col items-center rounded-[1.25rem] bg-white pt-5.25 pr-11 pb-5 pl-10.75 shadow-[0_0_12px_rgba(170,235,47,0.30)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 제목+내용*/}
        <div className="flex w-53.25 shrink-0 flex-col items-center gap-4">
          <div className="w-full text-center text-[1.125rem] leading-6.75 font-bold text-black">
            {title}
          </div>
          {message && (
            <div className="h-21 w-full text-center text-[0.875rem] leading-5.25 font-medium whitespace-pre-line text-black">
              {message}
            </div>
          )}
        </div>

        <button
          className="flex h-9 cursor-pointer items-center justify-center self-stretch rounded-[1.25rem] bg-neon-100 text-[0.875rem] leading-5.25 font-bold text-black"
          onClick={() => {
            onConfirm?.();
            onClose();
          }}
        >
          {label}
        </button>
      </div>
    </div>
  );
}
