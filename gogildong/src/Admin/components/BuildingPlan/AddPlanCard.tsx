import AddIcon from '@/Admin/assets/svgs/icon_add.svg?react';

type AddPlanCardProps = {
  onClick: () => void;
};

export default function AddPlanCard({ onClick }: AddPlanCardProps) {
  return (
    <div className="flex h-71 w-109.5 items-center justify-center gap-2 p-2">
      <div
        className="flex h-61.75 cursor-pointer flex-col items-center justify-center gap-7.25"
        onClick={onClick}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-[6.25rem] bg-[#F2FCE0] p-2">
          <AddIcon className="h-6 w-6" />
        </div>

        <span className="text-heading-lg text-gray-80">도면 등록하기</span>
      </div>
    </div>
  );
}
