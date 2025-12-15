import { useEffect } from 'react';
import CloseIcon from '../assets/icon_close.svg?react';
import type {
  ReportSummaryViewData,
  SummaryLine
} from '@/ReportView/types/reportSummary';

type ReportSummaryProps = {
  open: boolean;
  title?: string;
  data: ReportSummaryViewData;
  onClose: () => void;
};

function renderValueLine(line: Extract<SummaryLine, { kind: 'value' }>) {
  const unit = line.unit ?? 'cm';
  const valueText = line.value === null ? '-' : String(line.value);

  return (
    <div className="flex items-center justify-center">
      <span className="text-center text-body-md text-neon-100">
        {valueText}
      </span>
      <span className="ml-3 text-center text-body-sm leading-5.25 font-bold text-black">
        {unit}
      </span>
    </div>
  );
}

function renderSizeLine(line: Extract<SummaryLine, { kind: 'size' }>) {
  const unit = line.unit ?? 'cm';

  const left = line.width === null ? '-' : String(line.width);
  const right = line.height === null ? '-' : String(line.height);

  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-center text-body-md font-bold text-neon-100">
        {left}
      </span>
      <span className="text-body-sm font-bold text-black"> x </span>
      <span className="text-center text-body-md font-bold text-neon-100">
        {right}
      </span>
      <span className="text-center text-body-sm font-bold text-black">
        {unit}
      </span>
    </div>
  );
}

export default function ReportSummary({
  open,
  title = '제보 요약 정보',
  data,
  onClose
}: ReportSummaryProps) {
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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="relative flex w-75 flex-col rounded-20 bg-white px-[2.12rem] py-[1.44rem] shadow-[0_0_12px_rgba(170,235,47,0.30)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="relative flex items-center justify-center">
          <div className="text-center text-[1.125rem] leading-6.75 font-bold text-black">
            {title}
          </div>
          <CloseIcon
            onClick={onClose}
            className="absolute right-0 h-6.25 w-6.25 cursor-pointer"
          />
        </div>

        {/* 본문 */}
        <div className="mt-4">
          {data.kind === 'lines' && data.lines.length > 0 && (
            <div className="flex flex-col items-center gap-1 self-stretch py-2">
              {data.lines.map((line) => (
                <div
                  key={line.label}
                  className="flex items-center justify-between self-stretch"
                >
                  {/* 라벨 */}
                  <span className="text-body-sm text-gray-60">
                    {line.label}
                  </span>

                  {/* 값 */}
                  {line.kind === 'value'
                    ? renderValueLine(line)
                    : renderSizeLine(line)}
                </div>
              ))}
            </div>
          )}

          {data.kind === 'description' && (
            <div className="flex items-start justify-between self-stretch">
              <span className="text-body-sm text-gray-60">제보 설명</span>
              <span className="w-39.5 shrink-0 text-right text-body-sm whitespace-pre-line text-black">
                {data.description}
              </span>
            </div>
          )}

          {data.kind === 'empty' && (
            <div className="text-center text-body-sm text-gray-60">
              표시할 정보가 없어요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
