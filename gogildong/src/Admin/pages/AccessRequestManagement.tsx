import { useEffect, useState } from 'react';
import DesktopHeader from '@/Admin/components/DesktopHeader';
import ReportSearchFilterSection from '@/Admin/components/ReportSearchFilterSection';
import AccessRequestsTable from '@/Admin/components/AccessRequestsTable';
import VisibilityActions from '@/Admin/components/VisibilityActions';
import Pagination from '@/Admin/components/Pagination';
import AccessRequestDetailModal from '@/Admin/components/AccessRequestDetailModal';
import AccessBlockModal from '@/Admin/components/AccessBlockModal';
import BulkConfirmModal from '@/Admin/components/BulkConfirmModal';

// API 함수
import { getAccessRequests } from '@/Admin/api/adminApi';

type AccessRow = {
  id: number;
  requester: string;
  email: string;
  phone: string;
  requestedAt: string;
  status: '미승인' | '승인' | '거절';
};

export default function AccessRequestManagement() {
  const [rows, setRows] = useState<AccessRow[]>([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [selectedIds, setSelectedIds] = useState<Array<number | string>>([]);
  const [viewedIds, setViewedIds] = useState<Array<number | string>>([]);
  
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState<number | string | null>(null);
  const [detailStatus, setDetailStatus] = useState<'승인' | '거절'>('승인');
  const [detailMemo, setDetailMemo] = useState('');
  
  const [blockOpen, setBlockOpen] = useState(false);
  const [blockName, setBlockName] = useState<string>('요청자');
  const [confirmType, setConfirmType] = useState<'primary' | 'secondary' | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAccessRequests(page - 1, 10);
        
        // 데이터 매핑
        const mappedRows: AccessRow[] = data.viewRequests.map((item) => ({
          id: item.requestId,
          requester: item.username,
          email: item.email,
          phone: '-',
          requestedAt: formatDate(item.createdAt),
          status: convertStatus(item.status),
        }));

        setRows(mappedRows);
        setTotalItems(mappedRows.length); 
      } catch (error) {
        console.error("열람 요청 목록 조회 실패", error);
        setRows([]);
      }
    };
    fetchData();
  }, [page]);


  const convertStatus = (status: string): AccessRow['status'] => {
    switch (status) {
      case 'PENDING': return '미승인';
      case 'APPROVED': return '승인';
      case 'REJECTED': return '거절';
      default: return '미승인';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

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
      prev.map((r) => (r.id === id ? { ...r, status: status === '승인' ? '승인' : '미승인' } : r))
    );
  };

  const handleBlock = (id: number | string) => {
    const row = rows.find((r) => r.id === id);
    setBlockName(row?.requester ?? '요청자');
    setBlockOpen(true);
  };

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
          primaryLabel="승인"
          secondaryLabel="거절"
          onPrimary={() => setConfirmType('primary')}
          onSecondary={() => setConfirmType('secondary')}
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
          // 상세 정보는 rows에서 찾아서 전달
          name: rows.find(r => r.id === detailId)?.requester || '-',
          phone: rows.find(r => r.id === detailId)?.phone || '-',
          email: rows.find(r => r.id === detailId)?.email || '-'
        }}
        purpose="기타 열람 목적..."
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

      <BulkConfirmModal
        open={confirmType !== null}
        title={confirmType === 'primary' ? '전체 승인' : '전체 거절'}
        message={
          confirmType === 'primary'
            ? '선택된 항목을 전체 승인하시겠습니까?'
            : '선택된 항목을 전체 거절하시겠습니까?'
        }
        onCancel={() => setConfirmType(null)}
        onConfirm={() => {
          console.log(
            confirmType === 'primary' ? '승인 처리' : '거절 처리',
            selectedIds
          );
          setConfirmType(null);
        }}
      />
    </div>
  );
}