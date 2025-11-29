import { useEffect, useState } from "react";
import RadioOff from "../../assets/btn_radio.svg?react";
import RadioOn from "../../assets/btn_radio_select.svg?react";

type Option = { id: string; label: string };

type SelectSubmitModalProps = {
  open: boolean;
  title: string;
  options: Option[];
  label?: string; //'제출, 확인'
  onClose: () => void;
  onConfirm?: (optionId: string) => void;
};

export default function SelectSubmitModal({
  open,
  title,
  options,
  label,
  onClose,
  onConfirm
}: SelectSubmitModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (open) setSelectedId(null);
  }, [open]);

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

  const disabled = !selectedId;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      {/* 모달 카드 */}
      <div
        className="flex w-71.75 flex-col items-center rounded-[1.25rem] bg-white pt-5.25 pr-8.5 pb-5 pl-8.5 shadow-[0_0_12px_rgba(170,235,47,0.30)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 제목*/}
        <div className="flex w-53.25 shrink-0 flex-col items-center gap-4">
          <div className="w-full text-center text-[1.125rem] leading-6.75 font-bold text-black">
            {title}
          </div>
        </div>

        {/* 내용(라디오) */}
        <div className="mt-5 flex w-full flex-col items-start justify-center gap-1 self-stretch">
          {options.map((opt) => {
            const checked = selectedId === opt.id;
            return (
              <div key={opt.id} className="">
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center gap-1"
                  onClick={() => setSelectedId(opt.id)}
                >
                  {checked ? (
                    <RadioOn className="h-11 w-11" />
                  ) : (
                    <RadioOff className="h-11 w-11" />
                  )}
                  <span className="text-body-md leading-150 font-medium text-black">
                    {opt.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/*액션 버튼*/}
        <div className="mt-5 flex items-start gap-4">
          <button
            className="flex h-9 w-27 cursor-pointer items-center justify-center gap-2 rounded-[1.25rem] bg-gray-20 px-4.25 py-2.5 text-[0.875rem] leading-5.25 font-bold text-black"
            onClick={() => {
              onClose();
            }}
          >
            취소
          </button>
          <button
            className={`flex h-9 w-27 cursor-pointer items-center justify-center gap-2 rounded-[1.25rem] px-4.25 py-2.5 text-[0.875rem] leading-5.25 font-bold text-black ${disabled ? "cursor-not-allowed bg-gray-20" : "cursor-pointer bg-neon-100"} `}
            disabled={disabled}
            onClick={() => {
              if (!selectedId) return;
              onConfirm?.(selectedId);
              onClose();
            }}
          >
            {label}
          </button>
        </div>
      </div>
    </div>
  );
}

{
  /* 사용시
    const OPTIONS = [
     { id: "abuse", label: "비아냥/욕설" },
     { id: "gambling", label: "도배" },
     { id: "irrelevant", label: "관련 없는 댓글" },
     { id: "sexual", label: "성적 불쾌감 유발" }
    ];


    const [open, setOpen] = useState(true);
    const [targetReportId, setTargetReportId] = useState<number | null>(null);
    
    const openReportModal = (reportId: number) => {
        setTargetReportId(reportId);
        setOpen(true);
    };
    
    const handleConfirm = (optionId: string) => {
        if (targetReportId == null) return;
        // TODO: 신고 API 호출 등 처리
        console.log("신고하기:", { reportId: targetReportId, reason: optionId });
    };
    
//리턴 부분에

    <SelectSubmitModal
        open={open}
        title="댓글 신고 사유"
        options={OPTIONS}
        label="신고하기"
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    
    */
}
