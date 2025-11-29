import { useEffect, useRef, useState } from "react";
import OptionIcon from "../../assets/icon_option_black.svg?react";
import DoubleBtnModal from "../modals/DoubleBtnModal";
import SelectSubmitModal from "../modals/SelectSubmitModal";

type CommentItemProps = {
  nickname: string;
  date: string;
  content: string;
  isMine?: boolean;
};

const REPORT_OPTIONS = [
  { id: "abuse", label: "비아냥/욕설" },
  { id: "spam", label: "도배" },
  { id: "irrelevant", label: "관련 없는 댓글" },
  { id: "sexual", label: "성적 불쾌감 유발" }
];

export default function CommentItem({
  nickname,
  date,
  content,
  isMine = false
}: CommentItemProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const optionLabel = isMine ? "삭제하기" : "신고하기";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;

      // 메뉴 영역 밖을 클릭하면 닫기
      if (!menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  const handleModalOption = () => {
    if (isMine) {
      // 삭제하기
      setOpenMenu(false);
      setOpenDeleteModal(true);
    } else {
      // 신고하기
      setOpenMenu(false);
      setOpenReportModal(true);
    }
  };

  const handleConfirmDelete = () => {
    // TODO: 댓글 삭제 API 호출
    console.log("댓글 삭제");
  };

  const handleConfirmReport = (reasonId: string) => {
    // TODO: 댓글 신고 API 호출
    console.log("댓글 신고:", { reasonId });
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

      {/* 댓글 내용*/}
      <div className="flex items-center justify-center gap-2 self-stretch px-[2.56rem]">
        <p className="w-full text-body-sm text-black">{content}</p>
      </div>

      {/* 댓글 삭제 모달 */}
      <DoubleBtnModal
        open={openDeleteModal}
        title="이 댓글을 삭제할까요?"
        label="확인"
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* 댓글 신고 모달 (라디오 선택) */}
      <SelectSubmitModal
        open={openReportModal}
        title="댓글 신고 사유"
        options={REPORT_OPTIONS}
        label="신고하기"
        onClose={() => setOpenReportModal(false)}
        onConfirm={handleConfirmReport}
      />
    </div>
  );
}
