import { useEffect } from 'react';

type MypageDialogProps = {
  open: boolean;
  title: string;
  message: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function MypageDialog({
  open,
  title,
  message,
  cancelLabel = '취소',
  confirmLabel = '확인',
  onClose,
  onConfirm
}: MypageDialogProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[20.5rem] flex-col items-center gap-4 rounded-20 bg-white px-6 py-6 shadow-[0_0_12px_rgba(170,235,47,0.30)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-body-bold-lg text-black">{title}</p>
          <p className="text-body-sm text-black whitespace-pre-line">
            {message}
          </p>
        </div>
        <div className="mt-2 flex w-full items-center justify-center gap-4">
          <button
            type="button"
            className="flex h-9 w-27 items-center justify-center rounded-20 bg-gray-20 text-body-bold-sm text-black"
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="flex h-9 w-27 items-center justify-center rounded-20 bg-neon-100 text-body-bold-sm text-black"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
