import { useEffect, useState } from 'react';
import CloseIcon from '@/Admin/assets/svgs/btn_close.svg?react';
interface ReportDetailModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  reporter?: { name?: string; email?: string };
  facility?: { name?: string; title?: string };
  imageUrl?: string;
  measurements?: {
    entranceDoor?: string;
    innerDoor?: string;
    toiletHeight?: string;
    etcText?: string;
  };
  reportCount?: number;
  status?: '공개' | '비공개' | string;
  onStatusChange?: (status: '공개' | '비공개') => void;
}

export default function ReportDetailModal({
  open,
  onClose,
  title = '제보 상세',
  reporter,
  facility,
  imageUrl,
  measurements,
  reportCount,
  status,
  onStatusChange
}: ReportDetailModalProps) {
  const [localStatus, setLocalStatus] = useState<'공개' | '비공개'>(
    status === '비공개' ? '비공개' : '공개'
  );

  useEffect(() => {
    if (status === '비공개') setLocalStatus('비공개');
    else if (status === '공개') setLocalStatus('공개');
  }, [status]);

  const handleStatusChange = (next: '공개' | '비공개') => {
    setLocalStatus(next);
    onStatusChange?.(next);
  };

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
    <div className="fixed inset-0 left-95 z-50 flex items-center justify-center bg-black/50">
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
              <p className="text-heading-md text-black">제보자 정보</p>
              <div className="mt-3 flex justify-between text-body-lg">
                <span className="text-gray-80">이름</span>
                <span className="text-body-bold-lg text-black">
                  {reporter?.name ?? '-'}
                </span>
              </div>
              <div className="mt-2 flex justify-between text-body-lg">
                <span className="text-gray-80">이메일</span>
                <span className="text-body-bold-lg text-black">
                  {reporter?.email ?? '-'}
                </span>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-heading-lg text-black">제보 시설 정보</p>
              <div className="mt-3 flex justify-between text-body-lg">
                <span className="text-gray-80">시설명</span>
                <span className="text-body-bold-lg text-black">
                  {facility?.name ?? '-'}
                </span>
              </div>
              <div className="mt-2 flex justify-between text-body-lg">
                <span className="text-gray-80">명칭</span>
                <span className="text-body-bold-lg text-black">
                  {facility?.title ?? '-'}
                </span>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-heading-lg text-black">제보 내용</p>
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex justify-center">
                  <div className="flex h-40 w-full max-w-sm items-center justify-center rounded-xl bg-gray-20">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="제보 이미지"
                        className="h-full w-full rounded-xl object-cover"
                      />
                    ) : (
                      <span className="text-gray-50">이미지 없음</span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-body-lg">
                  <span className="text-gray-80">출입문</span>
                  <span className="text-body-bold-lg text-black">
                    {measurements?.entranceDoor ?? '-'}
                  </span>
                  <span className="text-gray-80">내부 문</span>
                  <span className="text-body-bold-lg text-black">
                    {measurements?.innerDoor ?? '-'}
                  </span>
                  <span className="text-gray-80">변기 높이</span>
                  <span className="text-body-bold-lg text-black">
                    {measurements?.toiletHeight ?? '-'}
                  </span>
                  {measurements?.etcText ? (
                    <>
                      <span className="text-gray-80">기타</span>
                      <span className="text-body-bold-lg text-black">
                        {measurements.etcText}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex justify-between rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-heading-md text-black">신고 횟수</p>
              <p className="mt-2 text-right text-heading-md text-neon-100">
                {reportCount ?? '-'}
                <span className="pl-1 text-black">회</span>
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-heading-md text-black">제보 상태 및 처리</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-gray-80">상태</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange('공개')}
                    className={`rounded-full px-4 py-2 text-body-sm ${
                      localStatus === '공개'
                        ? 'bg-neon-60 text-black'
                        : 'text-gray-70 bg-gray-20'
                    }`}
                  >
                    공개
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange('비공개')}
                    className={`rounded-full px-4 py-2 text-body-sm ${
                      localStatus === '비공개'
                        ? 'bg-neon-60 text-black'
                        : 'text-gray-70 bg-gray-20'
                    }`}
                  >
                    비공개
                  </button>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white">
              <button className="w-full rounded-3xl bg-neon-60 px-6 py-3 text-heading-lg text-black">
                변경 내용 저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
