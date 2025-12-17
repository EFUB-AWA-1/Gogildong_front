import { useEffect, useState } from 'react';
import DesktopHeader from '@/Admin/components/DesktopHeader';
import Pagination from '@/Admin/components/Pagination';
import RegisteredSchoolTable, {
  type SchoolRow
} from '@/Admin/components/RegisteredSchoolTable';
import SchoolSearchFilterSection from '@/Admin/components/SchoolSearchFilterSection';

// API 함수 임포트 (경로는 실제 파일 위치에 맞춰주세요)
import { getRegisteredSchools } from '@/Admin/api/adminApi';

export default function RegisteredSchoolList() {
  const [rows, setRows] = useState<SchoolRow[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);               
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRegisteredSchools(page - 1, pageSize);
        
        setTotalItems(data.total);

        const mappedRows: SchoolRow[] = data.schools.map((item, index) => ({
          id: (page - 1) * pageSize + index + 1, 
          region: item.region,
          level: convertEduLevel(item.eduLevel),     // 영어 -> 한글 변환
          name: item.schoolName,
          code: item.schoolCode,
          status: item.status === 'REGISTERED' ? '등록' : '미등록', // 상태 변환
          manager: item.adminPhone || '-',
          registeredAt: formatDate(item.registeredAt) // 날짜 포맷 변환
        }));

        setRows(mappedRows);
      } catch (error) {
        console.error("학교 목록 조회 실패", error);
        setRows([]);
      }
    };

    fetchData();
  }, [page]); 

  const convertEduLevel = (level: string) => {
    switch (level) {
      case 'primary': return '초등학교';
      case 'middle': return '중학교';
      case 'high': return '고등학교';
      case 'uni': return '대학교';
      default: return level;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <>
      <DesktopHeader title="등록된 학교 목록" />
      <SchoolSearchFilterSection />
      
      <div className="mt-6">
        <RegisteredSchoolTable rows={rows} />
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