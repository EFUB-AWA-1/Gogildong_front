interface VisibilityActionsProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onSelectNone?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary: () => void;
  onSecondary: () => void;
}

export default function VisibilityActions({
  selectedCount,
  totalCount,
  onSelectAll,
  onSelectNone,
  primaryLabel = '공개',
  secondaryLabel = '비공개',
  onPrimary,
  onSecondary
}: VisibilityActionsProps) {
  const hasSelection = selectedCount > 0;
  const allSelected = totalCount > 0 && selectedCount === totalCount;

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={allSelected ? (onSelectNone ?? onSelectAll) : onSelectAll}
        className="rounded-20 bg-white px-4 py-2 text-heading-lg text-black shadow"
      >
        {allSelected
          ? '전체취소'
          : hasSelection
            ? `전체선택 (${selectedCount}/${totalCount})`
            : `전체선택 (${selectedCount}/${totalCount})`}
      </button>
      <button
        type="button"
        onClick={onPrimary}
        disabled={!hasSelection}
        className={`rounded-20 px-4 py-2 text-heading-lg ${
          hasSelection ? 'bg-neon-100 text-black' : 'bg-gray-20 text-gray-60'
        }`}
      >
        {primaryLabel}
      </button>
      <button
        type="button"
        onClick={onSecondary}
        disabled={!hasSelection}
        className={`rounded-20 px-4 py-2 text-heading-lg ${
          hasSelection ? 'bg-neon-100 text-black' : 'bg-gray-20 text-gray-60'
        }`}
      >
        {secondaryLabel}
      </button>
    </div>
  );
}
