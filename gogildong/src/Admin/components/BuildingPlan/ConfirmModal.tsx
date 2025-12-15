type ConfirmModalProps = {
  title: string;
  message: string;
  onClose: () => void;
};

export default function ConfirmModal({
  title,
  message,
  onClose
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="z-999 flex w-162 flex-col items-center justify-center gap-12 rounded-20 bg-white px-5 py-10">
        {/* 제목 */}
        <h2 className="text-display-sm text-black">{title}</h2>

        {/* 메세지 */}
        <p className="text-heading-lg text-black">{message}</p>

        {/* 버튼 영역 */}
        <div className="flex w-145.75 gap-4">
          <button
            type="button"
            className="flex h-16 w-71 items-center justify-center rounded-[1.25rem] bg-gray-20 text-heading-md font-semibold text-black"
            onClick={() => onClose()}
          >
            취소
          </button>
          <button
            type="button"
            className="flex h-16 w-71 items-center justify-center rounded-[1.25rem] bg-neon-100 text-heading-md font-semibold text-black"
            onClick={() => onClose()}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
