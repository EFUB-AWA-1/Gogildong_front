import SchoolSearchBar from '@/Admin/components/SchoolSearchBar';
import SearchDropdown from '@/Admin/components/SearchDropdown';
import { useState } from 'react';
const REGIONS = [
  '서울',
  '인천',
  '부산',
  '대전',
  '광주',
  '대구',
  '울산',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주',
  '세종'
];

const SCHOOL_TYPES = ['초등학교', '중학교', '고등학교', '대학교'];

export default function SchoolSearchFilterSection() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSchoolType, setSelectedSchoolType] = useState<string | null>(
    null
  );
  const [keyword, setKeyword] = useState('');

  const handleReset = () => {
    setSelectedRegion(null);
    setSelectedSchoolType(null);
    setKeyword('');
  };

  return (
    <div className="flex gap-4">
      <SearchDropdown
        label="시/도"
        options={REGIONS}
        value={selectedRegion}
        onChange={(value) => setSelectedRegion(value)}
      />
      <SearchDropdown
        label="학교 종류"
        options={SCHOOL_TYPES}
        value={selectedSchoolType}
        onChange={(value) => setSelectedSchoolType(value)}
      />
      <SchoolSearchBar
        value={keyword}
        onChange={setKeyword}
        onSearch={(kw) => setKeyword(kw)}
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
