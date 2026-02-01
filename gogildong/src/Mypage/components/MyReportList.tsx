// src/Mypage/pages/MyReportList.tsx (경로는 프로젝트에 맞게)
import ReportItem from '@/Mypage/components/ReportItem';
import ReportImg from '@/Mypage/assets/ReportImg.png';

const DUMMY_REPORTS = [
  {
    id: 1,
    date: '2025.10.10',
    facilityType: '화장실',
    locationText: '본관 1층, 교무실 옆 화장실',
    photo: ReportImg,
    locationData: {
      building: '본관',
      floor: '1층',
      facility: '교무실 옆 화장실'
    },
    dimensions: {
      entranceDoorWidth: 90,
      entranceDoorHeight: 200,
      toiletHeight: 45
    },
    detail: { stallType: '일반', doorType: '미닫이', grabBar: '있음' }
  },
  {
    id: 2,
    date: '2025.10.10',
    facilityType: '교실',
    locationText: '본관 1층, 1학년 2반 교실',
    photo: ReportImg,
    locationData: {
      building: '본관',
      floor: '1층',
      facility: '1학년 2반 교실'
    },
    dimensions: { maxDoorWidth: 120, doorHandleHeight: 50, minAisleWidth: 50 },
    detail: { threshold: '턱 없음', doorType: '미닫이 문' }
  }
] as const;

export default function MyReportList() {
  return (
    <div className="mb-20 flex w-full flex-col items-center gap-2">
      {DUMMY_REPORTS.map((report) => (
        <ReportItem key={report.id} report={report} />
      ))}
    </div>
  );
}
