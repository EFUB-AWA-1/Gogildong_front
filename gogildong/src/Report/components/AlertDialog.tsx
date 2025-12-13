interface AlertDialogProps {
  onConfirm: () => void;
}

export default function AlertDialog({ onConfirm }: AlertDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex w-[300px] flex-col gap-4 rounded-2xl bg-white p-6 text-center shadow-lg">
        <p className="text-body-bold-lg text-black">등록 전 주의사항</p>

        <p className="text-gray-70 text-body-sm leading-relaxed">
          허위 정보 등록 시 <br />
          제보가 제한될 수 있습니다. <br />
          3회 이상 누적될 경우, <br />
          게시글 삭제 및 이용이 제한됩니다.
        </p>

        <button
          onClick={onConfirm}
          className="mx-20 mt-2 rounded-[30px] bg-neon-100 py-2 text-body-sm text-black"
        >
          확인
        </button>
      </div>
    </div>
  );
}
