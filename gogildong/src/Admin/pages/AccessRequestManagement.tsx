import { useState } from 'react';
import DesktopHeader from '@/Admin/components/DesktopHeader';
import ReportSearchFilterSection from '@/Admin/components/ReportSearchFilterSection';
import AccessRequestsTable from '@/Admin/components/AccessRequestsTable';
import VisibilityActions from '@/Admin/components/VisibilityActions';
import Pagination from '@/Admin/components/Pagination';
import AccessRequestDetailModal from '@/Admin/components/AccessRequestDetailModal';
import AccessBlockModal from '@/Admin/components/AccessBlockModal';

type AccessRow = {
  id: number;
  requester: string;
  email: string;
  phone: string;
  requestedAt: string;
  status: '미승인' | '승인' | '거절';
};

export default function AccessRequestManagement() {
  const mockRows: AccessRow[] = Array.from({ length: 10 }, (_, idx) => ({
    id: idx + 1,
    requester: '김민지',
    email: 'mingi@naver.com',
    phone: '010-xxxx-xxxx',
    requestedAt: '2025.10.10',
    status: idx % 3 === 0 ? '미승인' : idx % 3 === 1 ? '승인' : '거절'
  }));
  const [rows, setRows] = useState<AccessRow[]>(mockRows);

  const [selectedIds, setSelectedIds] = useState<Array<number | string>>([]);
  const [viewedIds, setViewedIds] = useState<Array<number | string>>([]);
  const [page, setPage] = useState(1);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState<number | string | null>(null);
  const [detailStatus, setDetailStatus] = useState<'승인' | '거절'>('승인');
  const [detailMemo, setDetailMemo] = useState('');
  const [blockOpen, setBlockOpen] = useState(false);
  const [blockName, setBlockName] = useState<string>('요청자');

  const handleSelectAll = (selected: boolean) => {
    setSelectedIds(selected ? rows.map((r) => r.id) : []);
  };

  const handleSelectRow = (id: number | string, checked: boolean) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((v) => v !== id)));
  };

  const handleClearSelection = () => setSelectedIds([]);

  const openDetail = (id: number | string) => {
    setDetailId(id);
    setDetailOpen(true);
    setViewedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    const row = rows.find((r) => r.id === id);
    if (row?.status === '거절') setDetailStatus('거절');
    else setDetailStatus('승인');
  };

  const handleStatusChange = (id: number | string, status: '승인' | '거절') => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const handleBlock = (id: number | string) => {
    const row = rows.find((r) => r.id === id);
    setBlockName(row?.requester ?? '요청자');
    setBlockOpen(true);
  };


  const totalItems = rows.length;
  const totalCount = rows.length;
  const selectedCount = selectedIds.length;

  return (
    <div className="flex flex-col gap-6">
      <DesktopHeader title="열람 요청 목록" />

      <div className="flex items-center justify-between">
        <VisibilityActions
          selectedCount={selectedCount}
          totalCount={totalCount}
          onSelectAll={() => handleSelectAll(true)}
          onSelectNone={handleClearSelection}
          onSetPublic={() => console.log('승인 처리', selectedIds)}
          onSetPrivate={() => console.log('거절 처리', selectedIds)}
        />
        <ReportSearchFilterSection />
      </div>

      <AccessRequestsTable
        rows={rows}
        selectedIds={selectedIds}
        viewedIds={viewedIds}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
        onClickDetail={(id) => openDetail(id)}
        onChangeStatus={handleStatusChange}
        onBlock={handleBlock}
      />

      <div className="mt-6 flex justify-center">
        <Pagination totalItems={totalItems} currentPage={page} onPageChange={setPage} />
      </div>

      <AccessRequestDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        title="승인 요청 상세"
        requester={{
          name: '김민지',
          phone: '010-1234-5678',
          email: '1234@naver.com'
        }}
        purpose="기타 열람 목적 텍스트..."
        status={detailStatus}
        memo={detailMemo}
        onStatusChange={(next) => setDetailStatus(next)}
        onMemoChange={(val) => setDetailMemo(val)}
        onSave={() => console.log('저장', detailId, detailStatus, detailMemo)}
      />

      <AccessBlockModal
        open={blockOpen}
        requesterName={blockName}
        onCancel={() => setBlockOpen(false)}
        onConfirm={() => {
          console.log('요청자 차단', blockName);
          setBlockOpen(false);
        }}
      />
    </div>
  );
}
