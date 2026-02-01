import Header from '@/common/components/Header';
import NavBar, { type NavKey } from '@/common/components/NavBar';
import TapSelector, { type TabType } from '@/Mypage/components/tapSelector';
import { useState } from 'react';
import MyReportList from '@/Mypage/components/MyReportList';
import MyReviewList from '@/Mypage/components/MyReviewList';

export default function ManageMyReport() {
  const [active, setActive] = useState<NavKey>('mypage');
  const [activeTab, setActiveTab] = useState<TabType>('report');

  return (
    <>
      <div className="flex min-h-screen flex-col bg-white">
        <div className="sticky top-0 bg-white">
          <Header title="내 제보 관리" />
          <TapSelector value={activeTab} onChange={setActiveTab} />
        </div>
        <div className="mx-4 my-[1.03rem] flex-1">
          {activeTab === 'report' && <MyReportList />}
          {activeTab === 'review' && <MyReviewList />}
        </div>
      </div>
      <div className="fixed right-[1.38rem] bottom-6 left-[1.38rem] z-50">
        <NavBar active={active} onChange={setActive} />
      </div>
    </>
  );
}
