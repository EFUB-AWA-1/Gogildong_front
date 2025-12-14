import SearchIcon from '@/Admin/assets/svgs/icon_search.svg?react';

interface SchoolSearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (keyword: string) => void;
  onSearch?: (keyword: string) => void;
}

export default function SchoolSearchBar({
  placeholder = '학교명을 입력하세요.',
  value,
  onChange,
  onSearch
}: SchoolSearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-3 rounded-3xl bg-white px-4 py-2 shadow-sm"
    >
      <input
        className="flex-1 rounded-2xl bg-white px-3 py-2 text-heading-md text-black placeholder:text-gray-40 focus:outline-none"
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        value={value}
      />
      <button
        type="submit"
        aria-label="학교 검색"
        className="flex items-center justify-center"
      >
        <SearchIcon />
      </button>
    </form>
  );
}
