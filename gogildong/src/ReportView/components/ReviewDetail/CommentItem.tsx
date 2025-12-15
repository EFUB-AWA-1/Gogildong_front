import { useEffect, useRef, useState } from 'react';
import OptionIcon from '../../assets/icon_option_black.svg?react';
import DoubleBtnModal from '../modals/DoubleBtnModal';
import SingleBtnModal from '@/ReportView/components/modals/SingleBtnModal';

type CommentItemProps = {
  nickname: string;
  date: string;
  content: string;
  isMine?: boolean;
  onDelete?: () => void; // 삭제 핸들러 prop
  onReport?: () => void; // 신고 핸들러 prop
};

export default function CommentItem({
  nickname,
  date,
  content,
  isMine = false,
  onDelete,
  onReport // 추가
}: CommentItemProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportResultOpen, setReportResultOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // isMine에 따라 라벨 변경
  const optionLabel = isMine ? '삭제하기' : '신고하기';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    if (openMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenu]);

  const handleModalOption = () => {
    if (isMine) {
      setOpenMenu(false);
      setOpenDeleteModal(true);
    } else {
      setOpenMenu(false);
      setOpenReportModal(true);
    }
  };

  const handleConfirmDelete = () => {
    if (onDelete) onDelete();
    setOpenDeleteModal(false);
  };

  // 신고 함수
  const handleReportConfirm = async () => {
    if (onReport) {
      await onReport();
    }
    setOpenReportModal(false);
    setReportResultOpen(true); 
  };

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex items-center justify-between self-stretch pl-3">
        <div className="flex w-47 items-center gap-2">
          <div className="h-5.5 w-5.25 shrink-0 rounded-full bg-gray-10" />
          <span className="text-[0.875rem] leading-150 font-bold text-black">
            {nickname}
          </span>
          <span className="text-caption-md text-gray-60">{date}</span>
        </div>

        {/* 옵션 메뉴 버튼 */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpenMenu((prev) => !prev)}
            className="flex h-8.5 w-8.5 items-center justify-center"
          >
            <OptionIcon className="h-8.5 w-8.5" />
          </button>

          {openMenu && (
            <button
              type="button"
              onClick={handleModalOption}
              className="absolute top-full right-3 mt-1 flex w-15 items-center justify-center gap-2 rounded-md bg-white p-2 text-caption-md text-black shadow-[0_0_4px_rgba(0,0,0,0.15)]"
            >
              {optionLabel}
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 self-stretch px-[2.56rem]">
        <p className="w-full text-body-sm text-black break-all whitespace-pre-wrap">{content}</p>
      </div>

      {/* 삭제 모달 */}
      <DoubleBtnModal
        open={openDeleteModal}
        title="이 댓글을 삭제할까요?"
        label="확인"
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* 신고 모달 */}
      <DoubleBtnModal
        open={openReportModal}
        title="댓글 신고하기"
        message="이 댓글을 신고할까요?"
        label="신고하기"
        onClose={() => setOpenReportModal(false)}
        onConfirm={handleReportConfirm}
      />

      {/* 신고 결과 모달 */}
      <SingleBtnModal
        open={reportResultOpen}
        title="신고가 제출되었습니다"
        message={'신고 3회 이상 누적 시 \n검토 후 댓글이 차단됩니다.'}
        label="확인"
        onClose={() => setReportResultOpen(false)}
      />
    </div>
  );
}