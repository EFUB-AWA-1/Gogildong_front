import CustomDropdown from '@/Admin/components/CustomDropdown';
import SchoolSearchBar from '@/Admin/components/SchoolSearchBar';
import { useState } from 'react';

export default function ReportSearchFilterSection() {
  const [selectFilter, setSelectFilter] = useState<string | null>(null);
  const [selectSorting, setSelectSorting] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');

  const handleReset = () => {
    setSelectFilter(null);
    setSelectSorting(null);
    setKeyword('');
  };

  const FILTER_TYPES = ['전체', '공개', '비공개', '반려'];
  const SORTING_TYPES = ['요청일', '제보자(가나다 순)', '시설명(가나다 순)'];

  return (
    <div className="flex items-center gap-[18px]">
      <SchoolSearchBar
        placeholder="제보자/시설명/명칭 등을 입력하세요."
        value={keyword}
        onChange={setKeyword}
        onSearch={(kw) => setKeyword(kw)}
        className="w-[427px]"
      />
      <CustomDropdown
        label="필터"
        options={FILTER_TYPES}
        value={selectFilter}
        onChange={(value) => setSelectFilter(value)}
      />
      <CustomDropdown
        label="정렬"
        options={SORTING_TYPES}
        value={selectSorting}
        onChange={(value) => setSelectSorting(value)}
      />
      <button
        type="button"
        onClick={handleReset}
        className="rounded-20 bg-neon-60 px-5 py-2 text-heading-lg whitespace-nowrap text-black"
      >
        초기화
      </button>
    </div>
  );
}
