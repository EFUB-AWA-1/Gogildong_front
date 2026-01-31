import NavBar, { type NavKey } from '@/common/components/NavBar';
import Header from '@/common/components/Header';
import { useState } from 'react';
import InfoIcon from '../assets/icon_info_gray.svg?react';
import SchoolItem from '@/Mypage/components/SchoolItem';
import CodeInputDialog from '@/Mypage/components/CodeInputDialog';

export default function ManageMySchool() {
  const [active, setActive] = useState<NavKey>('mypage');
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header title="내 학교 관리" />
      <div className="flex flex-1 flex-col gap-4">
        <div className="mx-6 mt-2 text-heading-md text-black">
          현재 등록된 학교
        </div>
        <SchoolItem onChangeClick={() => setIsCodeDialogOpen(true)} />
        <div className="ml-[0.87rem] flex flex-col text-body-xs text-gray-60">
          <div className="flex flex-row items-center gap-2">
            <InfoIcon />
            전학 또는 상급 학교 진학 시 정보를 변경해 주세요.
          </div>
          <div>
            카드의 변경 버튼을 누르면 새로운 학교 코드를 입력할 수 있습니다.
          </div>
        </div>
      </div>
      <div className="fixed right-[1.38rem] bottom-6 left-[1.38rem] z-50">
        <NavBar active={active} onChange={setActive} />
      </div>

      <CodeInputDialog
        open={isCodeDialogOpen}
        onClose={() => setIsCodeDialogOpen(false)}
        onConfirm={(code) => {
          // TODO: 여기서 code로 학교 조회/검증 API 연결
          // 예) fetchSchoolByCode(code)
          setIsCodeDialogOpen(false);
        }}
      />
    </div>
  );
}
