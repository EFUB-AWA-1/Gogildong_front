interface BulkConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function BulkConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel
}: BulkConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl">
        <p className="text-heading-lg text-black">{title}</p>
        <p className="mt-6 text-heading-sm text-black">{message}</p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="h-14 w-40 rounded-3xl bg-gray-20 text-heading-md text-black"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-14 w-40 rounded-3xl bg-neon-100 text-heading-md text-black"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
