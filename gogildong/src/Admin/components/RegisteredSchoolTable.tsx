export type SchoolStatus = '등록' | '미등록';

export interface SchoolRow {
  id: number;
  region: string;
  level: string;
  name: string;
  code: string;
  status: SchoolStatus;
  manager: string;
  registeredAt: string;
}

interface RegisteredSchoolTableProps {
  rows: SchoolRow[];
}

export default function RegisteredSchoolTable({
  rows
}: RegisteredSchoolTableProps) {
  return (
    <div className="overflow-hidden rounded-20 bg-white shadow-[0_0_12px_rgba(170,235,47,0.30)]">
      <table className="w-full table-fixed text-body-lg text-black">
        <thead className="border-gray-30 border-b text-heading-md">
          <tr>
            <th className="px-5 py-3 text-center">지역</th>
            <th className="px-5 py-3 text-center">학교급</th>
            <th className="px-5 py-3 text-center">학교명</th>
            <th className="px-5 py-3 text-center">학교 코드</th>
            <th className="px-5 py-3 text-center">상태</th>
            <th className="px-5 py-3 text-center">학교 관리자</th>
            <th className="px-5 py-3 text-center">등록일</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-5 py-6 text-center" colSpan={7}>
                등록된 학교가 없습니다.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-20 last:border-b-0"
              >
                <td className="px-5 py-4 text-center">{row.region}</td>
                <td className="px-5 py-4 text-center">{row.level}</td>
                <td className="px-5 py-4 text-center">{row.name}</td>
                <td className="px-5 py-4 text-center">{row.code}</td>
                <td className="px-5 py-4 text-center">{row.status}</td>
                <td className="px-5 py-4 text-center">{row.manager}</td>
                <td className="px-5 py-4 text-center">{row.registeredAt}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
