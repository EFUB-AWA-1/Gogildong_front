import ReportCard from './ReportCard';

export default function ReportGridList() {
  const reports = [
    {
      title: '1-A',
      date: '25.09.21',
      location: '미술관 앞 여자 화장실',
      isDisability: false,
    },
    {
      title: '1-B',
      date: '25.09.21',
      location: '미술관 앞 남자 화장실',
      isDisability: true,
    },
    {
      title: '1-C',
      date: '25.09.21',
      location: '본관 복도 앞',
      isDisability: false,
    },
    {
      title: '1-D',
      date: '25.09.21',
      location: '엘리베이터 옆',
      isDisability: true,
    },
  ];

  return (
    <div className='grid w-full gap-4 grid-cols-2'>
      {reports.map((r) => (
        <ReportCard
          key={r.title}
          title={r.title}
          date={r.date}
          location={r.location}
          isDisability={r.isDisability}
        />
      ))}
    </div>
  );
}
