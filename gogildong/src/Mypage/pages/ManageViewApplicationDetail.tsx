import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/common/components/Header';
import NavBar, { type NavKey } from '@/common/components/NavBar';

type RequestStatus = '승인' | '미승인' | '거절';

type ViewRequestDetail = {
  id: number;
  status: RequestStatus;
  date: string;
  schoolName: string;
  address: string;
  requesterName: string;
  requesterPhone: string;
  requesterEmail: string;
  reason: string;
};

const dummyDetails: ViewRequestDetail[] = [
  {
    id: 1,
    status: '미승인',
    date: '2025.10.10',
    schoolName: '이화여자대학교부속초등학교',
    address: '서울 서대문구 성산로 512-39',
    requesterName: '김민지',
    requesterPhone: '010-1234-5678',
    requesterEmail: '1234@naver.com',
    reason: '개인 조사/학습 목적'
  },
  {
    id: 2,
    status: '승인',
    date: '2025.10.10',
    schoolName: '이화여자대학교사범대학부속이화금란중학교',
    address: '서울 서대문구 성산로 512-39',
    requesterName: '김민지',
    requesterPhone: '010-1234-5678',
    requesterEmail: '1234@naver.com',
    reason: '개인 조사/학습 목적'
  }
];

const statusPillClass: Record<RequestStatus, string> = {
  승인: 'bg-neon-15 text-neon-d',
  미승인: 'bg-gray-20 text-gray-60',
  거절: 'bg-warning-30 text-warning-100'
};

export default function ManageViewApplicationDetail() {
  const { id } = useParams();
  const [active, setActive] = useState<NavKey>('mypage');

  const detail = useMemo(() => {
    const numericId = Number(id);
    return (
      dummyDetails.find((item) => item.id === numericId) ?? dummyDetails[0]
    );
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header title="내 열람 신청 관리" />

      <div className="flex flex-1 flex-col gap-4 px-6 py-6 pb-24">
        <p className="text-heading-md text-black">요청 상세</p>

        <div className="flex flex-col gap-6 rounded-20 border border-gray-20 p-6">
          <div className="flex items-center justify-between text-body-sm">
            <span
              className={`rounded-lg px-2 py-1 ${statusPillClass[detail.status]}`}
            >
              {detail.status}
            </span>
            <span className="text-gray-60">{detail.date}</span>
          </div>

          <div className="text-black">
            <p className="text-body-bold-md">{detail.schoolName}</p>
            <p className="mt-1 text-body-xs">{detail.address}</p>
          </div>

          <div className="flex flex-col gap-[22px]">
            <p className="text-body-bold-lg text-black">요청자 정보</p>
            <div className="flex flex-col gap-2 text-body-md">
              <div className="flex justify-between text-gray-60">
                <span>이름</span>
                <span className="text-black">{detail.requesterName}</span>
              </div>
              <div className="flex justify-between text-gray-60">
                <span>전화번호</span>
                <span className="text-black">{detail.requesterPhone}</span>
              </div>
              <div className="flex justify-between text-gray-60">
                <span>이메일</span>
                <span className="text-black">{detail.requesterEmail}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[22px] text-black">
            <p className="text-body-bold-lg">요청 사유</p>
            <p className="text-body-md">{detail.reason}</p>
          </div>
        </div>
      </div>

      <div className="fixed right-[1.38rem] bottom-6 left-[1.38rem] z-50">
        <NavBar active={active} onChange={setActive} />
      </div>
    </div>
  );
}
