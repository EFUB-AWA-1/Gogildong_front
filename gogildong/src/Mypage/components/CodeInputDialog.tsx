import { useEffect, useState } from 'react';
import DeleteIcon from '../assets/icon_textdelete.svg?react';
import { useNavigate } from 'react-router-dom';

type CodeInputDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (code: string) => void;
};

export default function CodeInputDialog({
  open,
  onClose,
  onConfirm
}: CodeInputDialogProps) {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

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

  useEffect(() => {
    if (open) {
      setCode('');
      setIsInvalid(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = () => {
    // TODO: 유효성/서버검증 붙이기 전 임시 예시
    // 예: 빈 값이면 invalid 처리
    if (!code.trim()) {
      setIsInvalid(true);
      return;
    }

    onConfirm(code.trim());

    navigate('/mypage/myschool/confirm');
  };

  const handleClear = () => {
    setCode('');
    setIsInvalid(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[20.5rem] flex-col items-center gap-4 rounded-20 bg-white px-8 py-5 shadow-[0_0_12px_rgba(170,235,47,0.30)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-body-bold-lg text-black">학교 코드 입력</p>
          <p className="text-body-sm whitespace-pre-line text-black">
            학교 변경을 위해 담당 선생님께 받은 <br />
            학교 코드를 입력해주세요.
          </p>
        </div>

        <div>
          <div className="flex w-full flex-col">
            <div
              className={`flex h-[3.375rem] items-center gap-2 self-stretch rounded-20 border border-gray-20 bg-white px-6`}
            >
              <input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (isInvalid) setIsInvalid(false);
                }}
                placeholder="예) ABCD12"
                className="w-full bg-transparent text-body-sm text-black placeholder:text-gray-40 focus:outline-none"
              />

              <button
                type="button"
                aria-label="입력값 삭제"
                onClick={handleClear}
                className={`shrink-0 ${code.length > 0 ? 'visible' : 'invisible'}`}
              >
                <DeleteIcon />
              </button>
            </div>

            <div className="flex h-7.75 items-center self-stretch p-2">
              {isInvalid && (
                <p className="text-caption-sm text-warning-100">
                  유효하지 않은 학교 코드입니다.
                </p>
              )}
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-4">
            <button
              type="button"
              className="text-body-bold-sm flex h-9 w-27 items-center justify-center rounded-20 bg-gray-20 text-black"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="button"
              className="text-body-bold-sm flex h-9 w-27 items-center justify-center rounded-20 bg-neon-100 text-black"
              onClick={handleSubmit}
            >
              입력하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
