import { useEffect, useState } from 'react';
import CloseIcon from '@/Admin/assets/svgs/icon_delete_building.svg?react';

type BuildingModalProps = {
  open: boolean;
  title: string;
  inputTitle: string;
  placeholder?: string;
  defaultValue?: string;
  submitLabel: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
};

export default function BuildingModal({
  open,
  title,
  inputTitle,
  placeholder = '건물 이름을 입력하세요. (ex. 청운관, 본관 등)',
  defaultValue = '',
  submitLabel,
  onClose,
  onSubmit
}: BuildingModalProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (open) setValue(defaultValue);
  }, [open, defaultValue]);

  // ✅ AccessRequestDetailModal과 동일: 바디 스크롤 잠금
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

  // ✅ ESC 닫기
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayClick = () => onClose();
  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

  const handleSubmit = () => onSubmit(value.trim());
  const isDisabled = value.trim().length === 0;

  return (
    <div
      className="fixed inset-0 z-9000 flex items-center justify-center bg-black/40"
      onClick={handleOverlayClick}
    >
      <div
        onClick={handleModalClick}
        className="flex w-178.25 flex-col items-start overflow-hidden rounded-20 bg-white"
      >
        {/* Header */}
        <div className="flex w-full items-center justify-between border-b border-[#E4E4E4] bg-white px-5 py-4">
          <h2 className="px-5 text-display-sm text-black">{title}</h2>

          <CloseIcon onClick={onClose} className="h-12 w-12" />
        </div>

        {/* Body */}
        <div className="flex w-full flex-col items-center gap-6 bg-gray-10 px-8 py-8">
          <div className="flex w-161.75 flex-col items-center justify-center gap-4 rounded-20 bg-white px-8 py-6">
            <div className="w-145 text-heading-md text-black">{inputTitle}</div>

            <div className="flex w-full items-center justify-between rounded-20 bg-[#F5F5F5] p-4">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent text-body-lg text-black outline-none placeholder:text-[#A9A9A9]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className="flex h-19.5 w-161.75 items-center justify-center gap-2 rounded-20 bg-[#AAEB2F] px-54 py-4 text-heading-lg text-black disabled:cursor-not-allowed disabled:bg-gray-20"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
