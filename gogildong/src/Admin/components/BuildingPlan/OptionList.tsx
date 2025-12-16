type OptionListProps = {
  onRename: () => void;
  onDelete?: () => void;
};

export default function OptionList({ onRename, onDelete }: OptionListProps) {
  return (
    <div className="inline-flex flex-col items-center justify-center rounded-lg border border-gray-40 bg-white shadow-md">
      <button
        type="button"
        onClick={onRename}
        className="flex w-45 items-center justify-center gap-2 border-b border-gray-20 py-5 hover:rounded-t-lg hover:bg-gray-20"
      >
        <span className="text-body-lg text-black">이름 변경</span>
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="flex w-45 items-center justify-center gap-2 py-5 hover:rounded-b-lg hover:bg-gray-20"
      >
        <span className="text-body-lg text-warning-100">건물 삭제</span>
      </button>
    </div>
  );
}
