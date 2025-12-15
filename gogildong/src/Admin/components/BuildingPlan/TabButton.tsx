import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import KebabIcon from '@/Admin/assets/svgs/icon_kebab.svg?react';
import OptionList from '@/Admin/components/BuildingPlan/OptionList';
import ConfirmModal from './ConfirmModal';

type Props = {
  label: string;
  active: boolean;
  onClick: () => void;
  onOpenRename: () => void;
};

export default function TabButton({
  label,
  active,
  onClick,
  onOpenRename
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const kebabRef = useRef<SVGSVGElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = () => {
    const el = kebabRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setPos({
      top: rect.bottom + 15,
      left: rect.right + 20
    });
  };

  const handleKebabClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    updatePosition();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current?.contains(target)) return;
      if (
        kebabRef.current &&
        (kebabRef.current as unknown as Node).contains(target)
      )
        return;
      setIsOpen(false);
    };

    const handleReposition = () => updatePosition();

    window.addEventListener('mousedown', handleOutside);
    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);

    return () => {
      window.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
    };
  }, [isOpen]);

  const closeDropdown = () => setIsOpen(false);

  // ⚠️ dropdown 때문에 body 스크롤 막는 건 모달이랑 충돌 가능해서,
  // "다른 모달들과 동일하게" 하려면 이 로직은 나중에 공통 모달로 옮기는 게 안전합니다.
  useEffect(() => {
    const original = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
    document.body.style.overflow = original;
    return undefined;
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`flex h-13.5 shrink-0 items-center justify-center gap-2 rounded-2xl border border-transparent px-5 py-1.5 ${
          active ? 'bg-[#AAEB2F]' : 'bg-transparent hover:border-gray-40'
        }`}
      >
        <span className="text-heading-lg text-black">{label}</span>
        <KebabIcon
          ref={kebabRef}
          className="h-8.5 w-8.5 cursor-pointer rounded-full hover:bg-black/8"
          onClick={handleKebabClick}
        />
      </button>

      {isOpen &&
        createPortal(
          <>
            <div
              className="absolute inset-0 z-900 bg-black/40"
              onClick={closeDropdown}
            />

            <div
              ref={dropdownRef}
              style={{
                position: 'fixed',
                top: pos.top,
                left: pos.left,
                transform: 'translateX(-100%)',
                zIndex: 9999
              }}
            >
              <OptionList
                onRename={() => {
                  closeDropdown();
                  onOpenRename();
                }}
                onDelete={() => {
                  closeDropdown();
                  setIsDeleteModalOpen(true);
                }}
              />
            </div>
          </>,
          document.body
        )}

      {isDeleteModalOpen && (
        <ConfirmModal
          title="건물 삭제"
          message="해당 건물을 삭제하시겠습니까?"
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
}
