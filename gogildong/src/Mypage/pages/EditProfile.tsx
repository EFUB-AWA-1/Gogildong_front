import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/common/components/Header';
import ActionButton from '@/common/components/ActionButton';
import DefaultProfileImg from '../assets/profile_default.svg?react';
import CameraIcon from '@/Mypage/assets/icon_cam.svg?react';
import MypageDialog from '../components/MypageDialog';

export default function EditProfile() {
  const navigate = useNavigate();
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  const handleBackClick = () => {
    setOpenCancelDialog(true);
  };

  const handleCancelEdit = () => {
    setOpenCancelDialog(false);
    navigate(-1);
  };

  const handleOpenSaveDialog = () => {
    setOpenSaveDialog(true);
  };

  const handleGoEditPassword = () => {
    navigate('/mypage/edit-password');
  };

  const handleCloseDialog = () => {
    setOpenCancelDialog(false);
    setOpenSaveDialog(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header title="프로필 관리" onBackClick={handleBackClick} />

      <div className="flex flex-1 flex-col">
        <section className="flex flex-col items-center gap-4 border-b border-gray-20 px-6 py-10">
          <div className="relative h-28 w-28">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-20">
              <DefaultProfileImg className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-[0_0_10px_0_rgba(0,0,0,0.10)]" />
            </div>
            <button
              type="button"
              className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-neon-100 shadow border-2 border-white"
              aria-label="프로필 사진 변경"
            >
              <CameraIcon className="h-4 w-4 [&_path]:fill-white" />
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-8 px-6 py-8">
          <div className="flex flex-col gap-3">
            <p className="text-body-bold-md text-black">닉네임</p>
            <div className="rounded-20 border border-gray-20 px-5 py-4">
              <input
                type="text"
                defaultValue="길동이"
                className="w-full text-body-md text-black outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-body-bold-md text-black">회원정보</p>
            <div className="border-t border-gray-20" />
            <div className="flex flex-col gap-3 text-body-md">
              <div className='flex gap-[54px]'>
                <span className="text-gray-60 w-16">이름</span>
                <span className="text-black">홍길동</span>
              </div>
              <div className='flex gap-[54px]'>
                <span className="text-gray-60 w-16 ">아이디</span>
                <span className="text-black">kimchihi</span>
              </div>
              <div className='flex gap-[54px]'>
                <span className="text-gray-60 w-16">연락처</span>
                <span className="text-black">010-xxxx-xxxx</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-body-bold-md text-black">보안</p>
            <div className="border-t border-gray-20" />
            <div className="flex items-center justify-between">
              <span className="text-body-md text-gray-80">비밀번호</span>
              <button
                type="button"
                className="rounded-lg bg-gray-10 px-4 py-2 text-body-sm text-gray-80"
                onClick={handleGoEditPassword}
              >
                변경
              </button>
            </div>
          </div>
        </section>

        <div className="px-6 pb-10">
          <ActionButton label="수정하기" onClick={handleOpenSaveDialog} />
        </div>
      </div>

      <MypageDialog
        open={openCancelDialog}
        title="프로필 편집 취소"
        message={
          '프로필 편집을 취소하시겠습니까?\n지금까지 변경한 내용은\n저장되지 않고 삭제돼요.'
        }
        cancelLabel="계속 편집"
        confirmLabel="편집 취소"
        onClose={handleCloseDialog}
        onConfirm={handleCancelEdit}
      />

      <MypageDialog
        open={openSaveDialog}
        title="프로필 수정"
        message="입력하신 내용으로 프로필을 수정할까요?"
        onClose={handleCloseDialog}
        onConfirm={handleCloseDialog}
      />
    </div>
  );
}
