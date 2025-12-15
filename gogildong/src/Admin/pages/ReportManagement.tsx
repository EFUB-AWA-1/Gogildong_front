import DesktopHeader from '@/Admin/components/DesktopHeader';
import Pagination from '@/Admin/components/Pagination';
import ReportSearchFilterSection from '@/Admin/components/ReportSearchFilterSection';
import ReportDetailModal from '@/Admin/components/ReportDetailModal';
import ReportsTable from '@/Admin/components/ReportsTable';
import VisibilityActions from '@/Admin/components/VisibilityActions';
import BulkConfirmModal from '@/Admin/components/BulkConfirmModal';
import { useState } from 'react';

export default function ReportManagement() {
  const mockRows = Array.from({ length: 10 }, (_, idx) => ({
    id: idx + 1,
    reporter: '김민지',
    facility: '본관 1층',
    title: '교무실 옆 화장실',
    reportedAt: '2025.10.10',
    status: idx % 4 === 2 ? '반려' : idx % 3 === 0 ? '비공개' : '공개'
  }));

  const [page, setPage] = useState(1);
  const totalItems = mockRows.length;
  const [selectedIds, setSelectedIds] = useState<Array<number | string>>([]);
  const [viewedIds, setViewedIds] = useState<Array<number | string>>([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [, setDetailId] = useState<number | string | null>(null);
  const [confirmType, setConfirmType] = useState<'primary' | 'secondary' | null>(null);

  const handleSelectAll = (selected: boolean) => {
    setSelectedIds(selected ? mockRows.map((row) => row.id) : []);
  };

  const handleSelectRow = (id: number | string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((v) => v !== id)
    );
  };

  const handleClearSelection = () => setSelectedIds([]);

  const totalCount = mockRows.length;
  const selectedCount = selectedIds.length;

  const openDetail = (id: number | string) => {
    setDetailId(id);
    setDetailOpen(true);
    setViewedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div className="flex flex-col gap-6">
      <DesktopHeader title="제보 목록" />

      <div className="flex items-center justify-between">
        <VisibilityActions
          selectedCount={selectedCount}
          totalCount={totalCount}
          onSelectAll={() => handleSelectAll(true)}
          onSelectNone={handleClearSelection}
          primaryLabel="공개"
          secondaryLabel="비공개"
          onPrimary={() => setConfirmType('primary')}
          onSecondary={() => setConfirmType('secondary')}
        />
        <ReportSearchFilterSection />
      </div>

      <ReportsTable
        rows={mockRows}
        selectedIds={selectedIds}
        viewedIds={viewedIds}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
        onClickDetail={(id) => openDetail(id)}
      />
      <div className="mt-6 flex justify-center">
        <Pagination
          totalItems={totalItems}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>

      <ReportDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        title="제보 상세"
        reporter={{ name: '김민지', email: 'mingi@naver.com' }}
        facility={{ name: '본관 1층', title: '교무실 옆 화장실' }}
        measurements={{
          entranceDoor: '108 x 120 cm',
          innerDoor: '108 x 120 cm',
          toiletHeight: '50 cm'
        }}
        reportCount={2}
        status="공개"
      ></ReportDetailModal>

      <BulkConfirmModal
        open={confirmType !== null}
        title={confirmType === 'primary' ? '전체 공개' : '전체 비공개'}
        message={
          confirmType === 'primary'
            ? '선택된 항목을 전체 공개하시겠습니까?'
            : '선택된 항목을 전체 비공개하시겠습니까?'
        }
        onCancel={() => setConfirmType(null)}
        onConfirm={() => {
          console.log(
            confirmType === 'primary' ? '공개 설정' : '비공개 설정',
            selectedIds
          );
          setConfirmType(null);
        }}
      />
    </div>
  );
}
