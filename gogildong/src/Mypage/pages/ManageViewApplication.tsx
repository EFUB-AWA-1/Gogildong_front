import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/common/components/Header';
import NavBar, { type NavKey } from '@/common/components/NavBar';

type RequestStatus = '승인' | '미승인' | '거절';

type ViewRequest = {
  id: number;
  status: RequestStatus;
  schoolName: string;
  address: string;
};

const filterOptions = ['전체', '승인', '미승인', '거절'] as const;
type FilterOption = (typeof filterOptions)[number];

const dummyRequests: ViewRequest[] = [
  {
    id: 1,
    status: '미승인',
    schoolName: '이화여자대학교부속초등학교',
    address: '서울 서대문구 성산로 512-39'
  },
  {
    id: 2,
    status: '승인',
    schoolName: '이화여자대학교부속초등학교',
    address: '서울 서대문구 성산로 512-39'
  },
  {
    id: 3,
    status: '승인',
    schoolName: '이화여자대학교부속초등학교',
    address: '서울 서대문구 성산로 512-39'
  },
  {
    id: 4,
    status: '거절',
    schoolName: '이화여자대학교부속초등학교',
    address: '서울 서대문구 성산로 512-39'
  }
];

const statusPillClass: Record<RequestStatus, string> = {
  승인: 'bg-neon-15 text-neon-d',
  미승인: 'bg-gray-20 text-gray-60',
  거절: 'bg-gray-20 text-gray-60'
};

export default function ManageViewApplication() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('전체');
  const [active, setActive] = useState<NavKey>('mypage');
  const navigate = useNavigate();

  const filteredRequests = useMemo(() => {
    if (activeFilter === '전체') return dummyRequests;
    return dummyRequests.filter((item) => item.status === activeFilter);
  }, [activeFilter]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header title="내 열람 신청 관리" />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6 pb-24">
        <div className="flex gap-2">
          {filterOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setActiveFilter(option)}
              className={`rounded-full px-4 py-2 text-body-sm ${
                activeFilter === option
                  ? 'bg-neon-100 text-black'
                  : 'bg-gray-10 text-gray-80'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {filteredRequests.map((request) => (
            <button
              key={request.id}
              type="button"
              onClick={() =>
                navigate(`/mypage/manage-view-application/${request.id}`)
              }
              className="rounded-20 border border-gray-20 bg-white px-5 py-4 text-left"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-body-xs ${statusPillClass[request.status]}`}
                >
                  {request.status}
                </span>
                <button type="button" className="text-body-xs text-gray-40">
                  상세보기 &gt;
                </button>
              </div>
              <p className="text-body-bold-md mt-3 text-black">
                {request.schoolName}
              </p>
              <p className="mt-1 text-body-sm text-gray-80">
                {request.address}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed right-[1.38rem] bottom-6 left-[1.38rem] z-50">
        <NavBar active={active} onChange={setActive} />
      </div>
    </div>
  );
}
