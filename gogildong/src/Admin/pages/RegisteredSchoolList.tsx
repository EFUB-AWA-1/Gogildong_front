import { useMemo, useState } from 'react';
import DesktopHeader from '@/Admin/components/DesktopHeader';
import Pagination from '@/Admin/components/Pagination';
import RegisteredSchoolTable, {
  type SchoolRow
} from '@/Admin/components/RegisteredSchoolTable';
import SchoolSearchFilterSection from '@/Admin/components/SchoolSearchFilterSection';

export default function RegisteredSchoolList() {
  const mockRows: SchoolRow[] = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        region: '서울 강서구',
        level: '중학교',
        name: '공항중학교',
        code: 'ABCD12',
        status: i % 2 === 0 ? '등록' : '미등록',
        manager: i % 2 === 0 ? '010-1234-5678' : '-',
        registeredAt: i % 2 === 0 ? '2024/01/01' : '-'
      })),
    []
  );

  const [page, setPage] = useState(1);
  const totalItems = mockRows.length;

  return (
    <>
      <DesktopHeader title="등록된 학교 목록" />
      <SchoolSearchFilterSection />
      <div className="mt-6">
        <RegisteredSchoolTable rows={mockRows} />
      </div>
      <div className="mt-6 flex justify-center">
        <Pagination
          totalItems={totalItems}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
