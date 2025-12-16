import CloseIcon from '@/Admin/assets/svgs/icon_delete_building.svg?react';

type Props = {
  floorName: string;
  imageUrl: string;
  onClose?: () => void;
  onEdit: () => void;
  onPreviewImage: () => void;
};

export default function PlanDetailModal({
  floorName,
  imageUrl,
  onClose,
  onEdit,
  onPreviewImage
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="z-99 flex w-178.25 flex-col items-start rounded-t-20">
        <div className="flex w-full items-center justify-between rounded-t-20 border-b border-gray-20 bg-white px-5 py-4">
          <h2 className="text-display-sm text-black">도면 상세조회</h2>

          <button type="button" onClick={onClose} aria-label="close">
            <CloseIcon className="h-12 w-12" />
          </button>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4.75 rounded-b-20 bg-gray-10 px-12 pt-8.25 pb-6">
          <section className="flex w-161.75 items-center justify-between rounded-20 bg-white px-8 py-6">
            <div className="text-heading-md text-black">시설 층수</div>
            <div className="text-heading-lg text-black">{floorName}</div>
          </section>

          <section className="flex w-161.75 flex-col items-center justify-center gap-4 rounded-20 bg-white px-8 py-6">
            <h3 className="w-145 text-heading-md text-black">시설 도면</h3>

            {/* 도면 클릭 시 확대 */}
            <div
              onClick={onPreviewImage}
              className="flex h-61.75 w-145 cursor-pointer overflow-hidden rounded-20 bg-gray-10"
            >
              <img
                src={imageUrl}
                alt={`${floorName} 도면`}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </section>

          <button
            type="button"
            onClick={onEdit}
            className="flex h-19.5 w-161.75 items-center justify-center gap-2 rounded-20 bg-neon-100 px-54 py-4 text-heading-lg text-black"
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}
