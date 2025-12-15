import CheckIcon from '@/Admin/assets/svgs/btn_checkbox.svg?react';
import DownIcon from '@/Report/assets/svgs/down.svg?react';
import { useState } from 'react';

export interface AccessRow {
  id: string | number;
  requester: string;
  email: string;
  phone: string;
  requestedAt: string;
  status: string;
}

interface AccessRequestsTableProps {
  rows: AccessRow[];
  selectedIds: Array<string | number>;
  viewedIds?: Array<string | number>;
  onSelectRow: (id: string | number, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onClickDetail?: (id: string | number) => void;
  onChangeStatus?: (id: string | number, status: '승인' | '거절') => void;
  onBlock?: (id: string | number) => void;
}

export default function AccessRequestsTable({
  rows,
  selectedIds,
  viewedIds = [],
  onSelectRow,
  onSelectAll,
  onClickDetail,
  onChangeStatus,
  onBlock
}: AccessRequestsTableProps) {
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;
  const [openStatusId, setOpenStatusId] = useState<string | number | null>(
    null
  );

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
            <th className="px-5 py-3 text-center">요청자</th>
            <th className="px-5 py-3 text-center">이메일</th>
            <th className="px-5 py-3 text-center">전화번호</th>
            <th className="px-5 py-3 text-center">요청일</th>
            <th className="px-5 py-3 text-center">상태</th>
            <th className="px-5 py-3 text-center">요청 상세</th>
          </tr>
        </thead>
        <tbody className="text-body-lg">
          {rows.map((row, idx) => {
            const selected = selectedIds.includes(row.id);
            const viewed = viewedIds.includes(row.id);
            const stripe = idx % 2 === 1 ? 'bg-gray-5' : 'bg-white';

            return (
              <tr
                key={row.id}
                className={`h-20 border-b border-gray-20 text-center ${stripe}`}
              >
                <td className="pl-10 text-center align-middle">
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
                <td className="px-5 text-center align-middle">
                  {row.requester}
                </td>
                <td className="px-5 text-center align-middle">{row.email}</td>
                <td className="px-5 text-center align-middle">{row.phone}</td>
                <td className="px-5 text-center align-middle">
                  {row.requestedAt}
                </td>
                <td className="px-5 text-center align-middle">
                  <div className="relative inline-block">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenStatusId(openStatusId === row.id ? null : row.id)
                      }
                      className="flex items-center gap-1"
                    >
                      <span className="text-body-md text-black">
                        {row.status}
                      </span>
                      <DownIcon className="text-gray-70 h-4 w-4" />
                    </button>
                    {openStatusId === row.id && (
                      <div className="border-gray-30 absolute top-8 left-1/2 z-20 w-32 -translate-x-1/2 overflow-hidden rounded-xl border bg-white shadow-lg">
                        <button
                          type="button"
                          className="flex w-full items-center justify-center px-3 py-2 text-body-md text-black hover:bg-gray-10"
                          onClick={() => {
                            onChangeStatus?.(row.id, '승인');
                            setOpenStatusId(null);
                          }}
                        >
                          승인하기
                        </button>
                        <div className="h-px w-full bg-gray-20" />
                        <button
                          type="button"
                          className="flex w-full items-center justify-center px-3 py-2 text-body-md text-warning-100 hover:bg-gray-10"
                          onClick={() => {
                            onChangeStatus?.(row.id, '거절');
                            setOpenStatusId(null);
                          }}
                        >
                          거절하기
                        </button>
                        <div className="h-px w-full bg-gray-20" />
                        <button
                          type="button"
                          className="flex w-full items-center justify-center px-3 py-2 text-body-md text-warning-100 hover:bg-gray-10"
                          onClick={() => {
                            onBlock?.(row.id);
                            setOpenStatusId(null);
                          }}
                        >
                          요청자 차단
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-5 text-center align-middle">
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
