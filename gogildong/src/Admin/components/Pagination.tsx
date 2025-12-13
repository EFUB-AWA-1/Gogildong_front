import NextIcon from '@/Admin/assets/svgs/icon_next.svg?react';
import VeryNextIcon from '@/Admin/assets/svgs/icon_verynext.svg?react';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
}

const MAX_PAGE_BUTTONS = 10;

export default function Pagination({
  totalItems,
  currentPage,
  onPageChange,
  pageSize = 10
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const clampedPage = Math.min(Math.max(currentPage, 1), totalPages);

  const changePage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    if (nextPage !== clampedPage) onPageChange(nextPage);
  };

  const getPageNumbers = () => {
    if (totalPages <= MAX_PAGE_BUTTONS) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(MAX_PAGE_BUTTONS / 2);
    let start = clampedPage - half;
    let end = clampedPage + half;

    if (start < 1) {
      start = 1;
      end = MAX_PAGE_BUTTONS;
    } else if (end > totalPages) {
      end = totalPages;
      start = totalPages - MAX_PAGE_BUTTONS + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center gap-20 text-heading-md whitespace-nowrap text-gray-60">
      <div className="flex items-center">
        <button
          type="button"
          className="disabled:opacity-30"
          onClick={() => changePage(1)}
          disabled={clampedPage === 1}
          aria-label="첫 페이지"
        >
          <VeryNextIcon className="rotate-180" />
        </button>
        <button
          type="button"
          className="disabled:opacity-30"
          onClick={() => changePage(clampedPage - 1)}
          disabled={clampedPage === 1}
          aria-label="이전 페이지"
        >
          <NextIcon className="rotate-180" />
        </button>
      </div>

      <ul className="flex items-center gap-3">
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              type="button"
              onClick={() => changePage(page)}
              className={`h-13 w-13 text-center tabular-nums ${
                page === clampedPage ? 'text-black' : 'text-gray-60'
              }`}
              aria-current={page === clampedPage ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center">
        <button
          type="button"
          className="disabled:opacity-30"
          onClick={() => changePage(clampedPage + 1)}
          disabled={clampedPage === totalPages}
          aria-label="다음 페이지"
        >
          <NextIcon className="" />
        </button>
        <button
          type="button"
          className="disabled:opacity-30"
          onClick={() => changePage(totalPages)}
          disabled={clampedPage === totalPages}
          aria-label="마지막 페이지"
        >
          <VeryNextIcon className="" />
        </button>
      </div>
    </nav>
  );
}
