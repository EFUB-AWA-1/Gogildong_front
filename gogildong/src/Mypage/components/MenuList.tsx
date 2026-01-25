// src/Mypage/components/MenuList.tsx
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';

type MenuListProps = {
  loginId: string;
  onClickLogout: () => void;
};

export default function MenuList({ loginId, onClickLogout }: MenuListProps) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col items-center bg-white p-4">
      <MenuItem label="프로필 관리" onClick={() => navigate('/mypage/edit-profile')} />
      <MenuItem label="내 학교 관리" />
      <MenuItem
        label="내 열람 신청 관리"
        onClick={() => navigate('/mypage/manage-view-application')}
      />
      <MenuItem label="내 보조기구 관리" />
      <MenuItem label="공지사항" />
      <MenuItem label="로그아웃" rightText={loginId} onClick={onClickLogout} />
    </div>
  );
}
