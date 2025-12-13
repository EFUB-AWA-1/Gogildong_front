import SearchIcon from '@/Admin/assets/svgs/icon_search.svg?react';
import { useState } from 'react';

interface SchoolSearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (keyword: string) => void;
  onReset?: () => void;
}

export default function SchoolSearchBar({
  placeholder = '학교명을 입력하세요.',
  defaultValue = '',
  onSearch,
  onReset
}: SchoolSearchBarProps) {
  const [keyword, setKeyword] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(keyword.trim());
  };

  const handleReset = () => {
    setKeyword('');
    onReset?.();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-3 rounded-3xl bg-white px-4 py-2 shadow-sm"
      >
        <input
          className="flex-1 rounded-2xl bg-white px-3 py-2 text-heading-md text-black placeholder:text-gray-40 focus:outline-none"
          type="text"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={placeholder}
          value={keyword}
        />
        <button
          type="submit"
          aria-label="학교 검색"
          className="flex items-center justify-center"
        >
          <SearchIcon />
        </button>
      </form>
      <button
        type="button"
        onClick={handleReset}
        className="rounded-20 bg-neon-60 px-5 py-2 text-heading-lg whitespace-nowrap text-black"
      >
        초기화
      </button>
    </>
  );
}
