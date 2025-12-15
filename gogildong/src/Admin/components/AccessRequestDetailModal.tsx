import { useEffect, useState } from 'react';
import CloseIcon from '@/Admin/assets/svgs/btn_close.svg?react';

interface AccessRequestDetailModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  requester?: { name?: string; phone?: string; email?: string };
  purpose?: string;
  status?: '승인' | '거절' | string;
  memo?: string;
  onStatusChange?: (status: '승인' | '거절') => void;
  onMemoChange?: (memo: string) => void;
  onSave?: () => void;
}

export default function AccessRequestDetailModal({
  open,
  onClose,
  title = '승인 요청 상세',
  requester,
  purpose,
  status,
  memo,
  onStatusChange,
  onMemoChange,
  onSave
}: AccessRequestDetailModalProps) {
  const [localStatus, setLocalStatus] = useState<'승인' | '거절'>(
    status === '거절' ? '거절' : '승인'
  );
  const [localMemo, setLocalMemo] = useState(memo ?? '');

  useEffect(() => {
    if (status === '거절') setLocalStatus('거절');
    else if (status === '승인') setLocalStatus('승인');
  }, [status]);

  useEffect(() => {
    setLocalMemo(memo ?? '');
  }, [memo]);

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

  const handleStatusChange = (next: '승인' | '거절') => {
    setLocalStatus(next);
    onStatusChange?.(next);
  };

  const handleMemoChange = (val: string) => {
    setLocalMemo(val);
    onMemoChange?.(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-gray-10 shadow-xl">
        <div className="flex items-center justify-between bg-white px-6 py-4">
          <h2 className="text-heading-lg text-black">{title}</h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="text-3xl"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="h-px bg-gray-20" />

        <div className="scrollbar-hide max-h-[70vh] overflow-auto px-6 pt-4 pb-6">
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-heading-md text-black">요청자 정보</p>
              <div className="mt-3 flex justify-between text-body-lg">
                <span>이름</span>
                <span className="text-body-bold-lg text-black">
                  {requester?.name ?? '-'}
                </span>
              </div>
              <div className="mt-2 flex justify-between text-body-lg">
                <span>전화번호</span>
                <span className="text-body-bold-lg text-black">
                  {requester?.phone ?? '-'}
                </span>
              </div>
              <div className="mt-2 flex justify-between text-body-lg">
                <span>이메일</span>
                <span className="text-body-bold-lg text-black">
                  {requester?.email ?? '-'}
                </span>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-heading-md text-black">열람 목적</p>
              <p className="mt-3 text-body-lg text-black">{purpose ?? '-'}</p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-heading-md text-black">제보 상태 및 처리</p>
              <div className="mt-3 flex items-center justify-between">
                <span>상태</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange('승인')}
                    className={`rounded-full px-4 py-2 text-body-sm ${
                      localStatus === '승인'
                        ? 'bg-neon-60 text-black'
                        : 'text-gray-70 bg-gray-20'
                    }`}
                  >
                    승인
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange('거절')}
                    className={`rounded-full px-4 py-2 text-body-sm ${
                      localStatus === '거절'
                        ? 'bg-neon-60 text-black'
                        : 'text-gray-70 bg-gray-20'
                    }`}
                  >
                    거절
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-heading-md text-black">관리자 메모</p>
              <textarea
                className="mt-3 w-full rounded-2xl border-0 bg-gray-10 px-4 py-3 text-body-md text-black outline-none"
                placeholder="내용을 입력하세요."
                value={localMemo}
                onChange={(e) => handleMemoChange(e.target.value)}
              />
            </div>

            <div className="sticky bottom-0 bg-gray-10">
              <button
                type="button"
                onClick={onSave}
                className="w-full rounded-3xl bg-neon-60 px-6 py-3 text-heading-lg text-black"
              >
                변경 내용 저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
