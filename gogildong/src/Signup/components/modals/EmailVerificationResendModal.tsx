// src/Signup/components/modals/EmailVerificationResendModal.tsx
type EmailVerificationResendModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function EmailVerificationResendModal({
  open,
  onClose,
  onConfirm
}: EmailVerificationResendModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem] bg-white px-8 py-6 text-center shadow-[0_0_12px_rgba(170,235,47,0.30)]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-body-bold-lg whitespace-nowrap text-black">
          이메일 인증 코드를 다시 보낼까요?
        </p>
        <p className="mt-3 text-body-sm text-black">
          메일이 보이지 않으면
          <br />
          스팸함이나 프로모션함을 확인해 주세요.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="text-body-bold-sm flex-1 rounded-full bg-gray-20 py-3 text-gray-80"
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="button"
            className="text-body-bold-sm flex-1 rounded-full bg-neon-100 py-3 text-black"
            onClick={onConfirm}
          >
            재요청
          </button>
        </div>
      </div>
    </div>
  );
}
