import EditIcon from '@/Admin/assets/svgs/icon_edit.svg?react';

type Props = {
  floorName: string;
  imageUrl: string;
  onEdit: () => void;
};

export default function PlanCard({ floorName, imageUrl, onEdit }: Props) {
  return (
    <div className="flex h-71 w-109.5 flex-col items-center justify-center gap-2 rounded-20 bg-gray-10 p-4">
      <div className="relative h-48 self-stretch overflow-hidden rounded-[0.625rem]">
        <img
          src={imageUrl}
          alt={`${floorName} 도면`}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-black/20" />
      </div>

      <div className="flex items-center justify-between self-stretch">
        <div className="flex items-center justify-center p-2 text-heading-lg text-black">
          {floorName}
        </div>

        <button type="button" onClick={onEdit} className="flex">
          <EditIcon className="aspect-square h-11 w-11" />
        </button>
      </div>
    </div>
  );
}
