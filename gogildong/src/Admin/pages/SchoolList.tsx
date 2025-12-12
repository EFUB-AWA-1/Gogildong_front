import DesktopHeader from '@/Admin/components/DesktopHeader';
import SchoolSearchFilterSection from '@/Admin/components/SchoolSearchFilterSection';

export default function SchoolList() {
  return (
    <>
      <DesktopHeader title="등록된 학교 목록" />
      <SchoolSearchFilterSection />
    </>
  );
}
