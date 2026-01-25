import { useState } from 'react';
import Header from '@/common/components/Header';
import ActionButton from '@/common/components/ActionButton';
import EyeIcon from '@/Signup/assets/icon_eye.svg?react';
import EyeOffIcon from '@/Signup/assets/icon_eye_disabled.svg?react';
import MypageDialog from '../components/MypageDialog';

export default function EditPassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const passwordRule = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const isNewPasswordValid =
    newPassword.trim() !== '' && passwordRule.test(newPassword);
  const isConfirmValid =
    confirmPassword.trim() !== '' && confirmPassword === newPassword;

  const showNewPasswordError =
    newPassword.trim() !== '' && !isNewPasswordValid;
  const showConfirmError =
    confirmPassword.trim() !== '' && !isConfirmValid;

  const isFormFilled =
    currentPassword.trim() !== '' &&
    newPassword.trim() !== '' &&
    confirmPassword.trim() !== '';

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header title="비밀번호 변경" />

      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mb-8">
          <p className="text-heading-sm text-black">새 비밀번호로 변경하기</p>
          <p className="mt-2 text-body-sm text-gray-80">
            안전한 사용을 위해
            <br />
            이전과 다른 비밀번호를 설정해주세요.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-body-xs text-gray-80 px-4">기존 비밀번호</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder='영문, 숫자 조합 8글자 이상'
                className="w-full rounded-20 border border-gray-20 px-5 py-4 text-body-sm text-black outline-none focus:border-neon-100"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((prev) => !prev)}
                className="absolute top-1/2 right-4 -translate-y-1/2"
                aria-label="기존 비밀번호 보기 토글"
              >
                {showCurrent ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-xs text-gray-80 px-4">신규 비밀번호</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="영문, 숫자 조합 8글자 이상"
                className={`w-full rounded-20 border px-5 py-4 text-body-sm text-black outline-none focus:border-neon-100 ${
                  showNewPasswordError
                    ? 'border-warning-100'
                    : 'border-gray-20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNew((prev) => !prev)}
                className="absolute top-1/2 right-4 -translate-y-1/2"
                aria-label="신규 비밀번호 보기 토글"
              >
                {showNew ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            {showNewPasswordError && (
              <p className="text-body-xs text-warning-100 px-4">
                영문, 숫자 포함 8자 이상 입력해주세요.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-xs text-gray-80 px-4">
              신규 비밀번호 확인
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="영문, 숫자 조합 8글자 이상"
                className={`w-full rounded-20 border px-5 py-4 text-body-sm text-black outline-none focus:border-neon-100 ${
                  showConfirmError ? 'border-warning-100' : 'border-gray-20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute top-1/2 right-4 -translate-y-1/2"
                aria-label="신규 비밀번호 확인 보기 토글"
              >
                {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            {showConfirmError && (
              <p className="text-body-xs text-warning-100 px-4">
                동일한 비밀번호를 다시 입력해 주세요.
              </p>
            )}
          </div>
        </div>

        </div>
        <div className="sticky bottom-0 bg-white  px-6 ">
          <ActionButton
            label="변경하기"
            disabled={!isFormFilled || !isNewPasswordValid || !isConfirmValid}
            onClick={handleOpenConfirmDialog}
          />
        </div>
      </div>

      <MypageDialog
        open={openConfirmDialog}
        title="비밀번호 변경"
        message="확인을 누르면 새 비밀번호로 저장됩니다."
        onClose={handleCloseDialog}
        onConfirm={handleCloseDialog}
      />
    </div>
  );
}
