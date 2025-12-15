import CheckIcon from '@/Admin/assets/svgs/btn_checkbox.svg?react';

interface ReportRow {
  id: string | number;
  reporter: string;
  facility: string;
  title: string;
  reportedAt: string;
  status: '공개' | '비공개' | string;
}

interface ReportsTableProps {
  rows: ReportRow[];
  selectedIds: Array<string | number>;
  viewedIds?: Array<string | number>;
  onSelectRow: (id: string | number, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onClickDetail?: (id: string | number) => void;
}

export default function ReportsTable({
  rows,
  selectedIds,
  viewedIds = [],
  onSelectRow,
  onSelectAll,
  onClickDetail
}: ReportsTableProps) {
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;

  return (
    <div className="w-full overflow-hidden rounded-20 border border-gray-20 bg-white shadow-[0_0_12px_rgba(170,235,47,0.3)]">
      <table className="w-full table-fixed border-collapse text-body-md text-black">
        <thead className="h-20 border-b text-center text-heading-md text-black">
          <tr className="h-12">
            <th className="w-16 pl-10 text-center align-middle">
              <label className="relative inline-flex h-5 w-5 cursor-pointer items-center justify-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
                <div
                  className={`h-5 w-5 rounded border bg-white ${
                    allSelected
                      ? 'border-neon-100 bg-neon-60'
                      : 'border-gray-40'
                  }`}
                />
                <CheckIcon className="pointer-events-none absolute h-5 w-5 text-black opacity-0 peer-checked:opacity-100" />
              </label>
            </th>
            <th className="px-5 py-3 text-center">제보자</th>
            <th className="px-5 py-3 text-center">시설명</th>
            <th className="px-5 py-3 text-center">명칭</th>
            <th className="px-5 py-3 text-center">제보일</th>
            <th className="px-5 py-3 text-center">상태</th>
            <th className="px-5 py-3 text-center">제보 상세</th>
          </tr>
        </thead>
        <tbody className="text-body-lg">
          {rows.map((row, idx) => {
            const selected = selectedIds.includes(row.id);
            const stripe = idx % 2 === 1 ? 'bg-gray-5' : 'bg-white';
            const viewed = viewedIds.includes(row.id);

            return (
              <tr
                key={row.id}
                className={`border-b border-gray-20 text-center ${stripe}`}
              >
                <td className="py-4 pl-10 text-center align-middle">
                  <label className="relative flex w-full cursor-pointer items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={selected}
                      onChange={(e) => onSelectRow(row.id, e.target.checked)}
                    />
                    <div
                      className={`h-5 w-5 rounded border bg-white ${
                        selected
                          ? 'border-neon-100 bg-neon-60'
                          : 'border-gray-40'
                      }`}
                    />
                    <CheckIcon className="pointer-events-none absolute h-5 w-5 text-black opacity-0 peer-checked:opacity-100" />
                  </label>
                </td>
                <td className="h-20 px-5 py-4 text-center">{row.reporter}</td>
                <td>{row.facility}</td>
                <td className="truncate px-2">{row.title}</td>
                <td>{row.reportedAt}</td>
                <td>
                  <span className={`rounded-full px-3 py-1`}>{row.status}</span>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => onClickDetail?.(row.id)}
                    className={`rounded-2xl px-5 py-3 ${
                      viewed
                        ? 'text-gray-70 bg-neon-15'
                        : 'bg-neon-100 text-black'
                    }`}
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
