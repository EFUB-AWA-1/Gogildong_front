import OptionIcon from "../../assets/icon_option_black.svg?react";
import ThumbIcon from "../../assets/icon_thumb.svg?react";
import ThumbIconOn from "../../assets/icon_thumb_on.svg?react";
import { useEffect, useRef, useState } from "react";
import DoubleBtnModal from "../modals/DoubleBtnModal";

type ReviewCardProps = {
  isMine?: boolean;
};

export default function ReviewCard({ isMine = false }: ReviewCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openReportConfirm, setOpenReportConfirm] = useState(false);
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

  const handleToggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const handleModalOption = () => {
    if (isMine) {
      setOpenMenu(false);
      setOpenDeleteModal(true);
    } else {
      setOpenMenu(false);
      setOpenReportConfirm(true);
    }
  };

  const handleConfirmDelete = () => {
    // TODO: 리뷰 삭제 API 호출
    console.log("리뷰 삭제");
  };

  const handleConfirmReport = () => {
    // TODO: 리뷰 신고 API 호출
    console.log("리뷰 신고");
  };

  return (
    <section className="flex w-full max-w-[480px] flex-col items-center gap-3 p-4">
      <article className="flex w-full flex-col items-end gap-1 rounded-2xl bg-white py-2 shadow-[0_0_4px_rgba(0,0,0,0.10)]">
        <div className="flex w-full items-center justify-between pr-2 pl-3">
          {/*프로필 및 옵션*/}
          <div className="flex w-51 items-center gap-2">
            <div className="h-5.25 w-5.25 shrink-0 rounded-full bg-gray-10" />
            <span className="text-[0.875rem] leading-150 font-bold text-black">
              닉네임
            </span>
            <span className="text-caption-md text-gray-60">2025-09-21</span>
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

        {/* 리뷰내용 */}
        <div className="flex w-full items-center justify-center gap-2 self-stretch px-[1.72rem]">
          <p className="w-full text-body-sm text-black">
            여기 화장실 수압이 약해서 물이 잘 안 내려가요. 참고하세요.
            내용길어지는중입니다듀듀듀텍스트AWA으악더더더더더더ㅓ더더덛길어져
          </p>
        </div>

        {/* 추천 */}
        <div className="flex w-full px-3 pt-1 pb-2">
          <button
            type="button"
            onClick={handleToggleLike}
            className={`flex h-6.5 items-center gap-2.5 rounded-[1.25rem] border ${isLiked ? "border-neon-100" : "border-gray-20"} bg-white px-2.5`}
          >
            {isLiked ? (
              <ThumbIconOn className="h-3 w-3" />
            ) : (
              <ThumbIcon className="h-3 w-3" />
            )}
            <span
              className={`text-body-sm ${isLiked ? "text-neon-100" : "text-gray-80"}`}
            >
              추천 3
            </span>
          </button>
        </div>
      </article>

      {/* 리뷰 삭제 모달 */}
      <DoubleBtnModal
        open={openDeleteModal}
        title="이 리뷰를 삭제할까요?"
        label="확인"
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* 리뷰 신고 모달 (확인 한 번 더) */}
      <DoubleBtnModal
        open={openReportConfirm}
        title="리뷰를 신고할까요?"
        message={"신고한 리뷰는 관리자의 신고 처리 후\n삭제될 수 있습니다."}
        label="신고하기"
        onClose={() => setOpenReportConfirm(false)}
        onConfirm={handleConfirmReport}
      />
    </section>
  );
}
