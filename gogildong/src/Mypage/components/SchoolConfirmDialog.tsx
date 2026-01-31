interface SchoolConfirmDialogProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default function SchoolConfirmDialog({
  onConfirm,
  onClose
}: SchoolConfirmDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="flex w-[300px] flex-col gap-4 rounded-2xl bg-white p-6 text-center shadow-[0_0_12px_0_rgba(170,235,47,0.30)]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-body-bold-lg text-black">학교 변경 완료</p>

        <p className="text-gray-70 text-body-sm leading-relaxed">
          학교 변경이 완료되었어요! <br />
          마이페이지 및 길동이 페이지에서 <br />
          변경된 학교를 확인할 수 있어요.
        </p>

        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="shadow-[0_0_12px_0_rgba(170, 235, 47, 0.30)] mx-20 mt-2 rounded-[30px] bg-neon-100 py-2 text-body-sm text-black"
        >
          확인
        </button>
      </div>
    </div>
  );
}
