import { useEffect } from 'react';

interface AccessBlockModalProps {
  open: boolean;
  requesterName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AccessBlockModal({
  open,
  requesterName,
  onConfirm,
  onCancel
}: AccessBlockModalProps) {
  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
    document.body.style.overflow = original;
    return undefined;
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl">
        <p className="text-heading-lg text-black">요청자 차단</p>
        <p className="mt-6 text-heading-md text-black">
          {`'${requesterName ?? '요청자'}'님이 더 이상 우리 학교에 대한 정보를 얻지 못하게 돼요.`}
          <br />
          그대로 진행하시겠어요?
        </p>
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
