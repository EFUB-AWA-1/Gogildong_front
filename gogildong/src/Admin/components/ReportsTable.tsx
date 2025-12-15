interface ReportRow {
  id: string | number;
  reporter: string;
  facility: string;
  title: string;
  reportedAt: string;
  status: '공개' | '비공개' | '반려' | string;
}

interface ReportsTableProps {
  rows: ReportRow[];
  selectedIds: Array<string | number>;
  onSelectRow: (id: string | number, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onClickDetail?: (id: string | number) => void;
}

const statusColors: Record<string, string> = {
  공개: 'bg-neon-60 text-black',
  비공개: 'bg-gray-20 text-gray-70',
  반려: 'bg-gray-10 text-gray-70'
};

export default function ReportsTable({
  rows,
  selectedIds,
  onSelectRow,
  onSelectAll,
  onClickDetail
}: ReportsTableProps) {
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;

  return (
    <div className="w-full overflow-hidden rounded-[20px] border border-gray-20 bg-white shadow-[0_0_12px_rgba(170,235,47,0.3)]">
      <table className="w-full table-fixed border-collapse text-body-md text-black">
        <thead className="bg-gray-10 text-center text-body-bold-sm text-gray-80">
          <tr className="h-12">
            <th className="w-16">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </th>
            <th className="w-28">제보자</th>
            <th className="w-32">시설명</th>
            <th className="w-48">명칭</th>
            <th className="w-28">제보일</th>
            <th className="w-20">상태</th>
            <th className="w-24">제보 상세</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const selected = selectedIds.includes(row.id);
            const stripe = idx % 2 === 1 ? 'bg-gray-5' : 'bg-white';
            const badgeClass =
              statusColors[row.status] ??
              'bg-gray-20 text-gray-70 border border-gray-30';

            return (
              <tr
                key={row.id}
                className={`h-12 border-b border-gray-20 text-center ${stripe}`}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={(e) => onSelectRow(row.id, e.target.checked)}
                  />
                </td>
                <td>{row.reporter}</td>
                <td>{row.facility}</td>
                <td className="truncate px-2 text-left">{row.title}</td>
                <td>{row.reportedAt}</td>
                <td>
                  <span className={`rounded-full px-3 py-1 text-body-sm ${badgeClass}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => onClickDetail?.(row.id)}
                    className="rounded-2xl bg-neon-60 px-4 py-1 text-body-bold-sm text-black"
                  >
                    보기
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
