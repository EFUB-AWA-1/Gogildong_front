import ActionButton from '@/common/components/ActionButton';
import Header from '@/common/components/Header';
import SchoolConfirmDialog from '@/Mypage/components/SchoolConfirmDialog';
import SchoolItem from '@/Mypage/components/SchoolItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConfirmMySchoolChange() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirmChange = () => {
    //api 연결 예정
    navigate('/mypage/myschool');
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header title="내 학교 관리" />
      <div className="mt-4 flex flex-1 flex-col">
        <div className="mx-[1.56rem] flex flex-col items-center gap-2">
          <div className="self-stretch text-heading-md text-black">
            변경 학교 확인
          </div>

          <div className="self-stretch text-body-md text-black">
            이 학교로 변경하시겠어요?
          </div>
        </div>
        <div className="mx-2 mt-4">
          <SchoolItem showButton={false} />
        </div>
      </div>
      <div className="sticky bottom-0 px-5 py-[1.06rem]">
        <ActionButton label="변경하기" onClick={() => setIsDialogOpen(true)} />
      </div>
      {isDialogOpen && (
        <SchoolConfirmDialog
          onConfirm={handleConfirmChange}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
}
