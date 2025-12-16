import { useRef, useState } from 'react';
import CloseIcon from '@/Admin/assets/svgs/icon_delete_building.svg?react';
import AddIcon from '@/Admin/assets/svgs/icon_add.svg?react';
import WhiteAddIcon from '@/Admin/assets/svgs/icon_add_white.svg?react';

type AddPlanModalProps = {
  onClose?: () => void;
  mode?: 'create' | 'edit';
  initialFloor?: string;
  initialImageUrl?: string;
};

export default function AddPlanModal({
  onClose,
  mode,
  initialFloor,
  initialImageUrl
}: AddPlanModalProps) {
  const [floor, setFloor] = useState(initialFloor ?? '');
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImageUrl ?? null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isSubmitEnabled = floor.trim() !== '' && previewUrl !== null;
  const title = mode === 'edit' ? '도면 수정하기' : '도면 등록하기';
  const submitLabel = mode === 'edit' ? '변경 내용 저장' : '등록하기';

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일 허용
    if (!file.type.startsWith('image/')) return;

    const nextUrl = URL.createObjectURL(file);
    setPreviewUrl(nextUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="z-99 flex w-178.25 flex-col items-start rounded-t-20">
        {/* 상단 제목 영역 */}
        <div className="flex w-full items-center justify-between rounded-t-20 border-b border-gray-20 bg-white px-5 py-4">
          <h2 className="text-display-sm text-black">{title}</h2>

          <button type="button" onClick={onClose} aria-label="close">
            <CloseIcon className="h-12 w-12" />
          </button>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4.75 rounded-b-20 bg-gray-10 px-12 pt-8.25 pb-6">
          {/* 시설 층수 입력 영역 */}
          <section className="flex w-161.75 flex-col items-center justify-center gap-4 rounded-20 bg-white px-8 py-6">
            <h3 className="w-145 text-heading-md text-black">시설 층수</h3>

            <div className="flex w-full items-center justify-between rounded-20 bg-gray-10 p-4">
              <input
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="1층이라면 1, 지하 1층이라면 B1을 입력해 주세요."
                className="w-full bg-transparent text-body-lg text-black outline-none placeholder:text-gray-40"
              />
            </div>
          </section>

          {/* 시설 도면 */}
          <section className="flex w-161.75 flex-col items-center justify-center gap-4 rounded-20 bg-white px-8 py-6">
            <h3 className="w-145 text-heading-md text-black">시설 도면</h3>

            {/* 숨겨진 input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChangeFile}
            />

            {/* 클릭 영역 */}
            <div
              onClick={handleClickUpload}
              className="group relative flex h-61.75 w-145 cursor-pointer items-center justify-center overflow-hidden rounded-20"
            >
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="도면 미리보기"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />

                  {/* hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex flex-col items-center justify-center gap-7.25">
                      <div className="flex h-20 w-20 items-center justify-center rounded-[6.25rem] bg-neon-100 p-2">
                        <WhiteAddIcon className="h-6 w-6" />
                      </div>

                      <span className="text-heading-lg text-white">
                        도면 이미지 수정하기
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-7.25">
                  <div className="flex h-20 w-20 items-center justify-center rounded-[6.25rem] bg-[#F2FCE0] p-2">
                    <AddIcon className="h-6 w-6" />
                  </div>

                  <span className="text-heading-lg text-gray-80">
                    도면 등록하기
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* 등록하기 버튼 */}
          <button
            disabled={!isSubmitEnabled}
            type="button"
            className={`flex h-19.5 w-161.75 items-center justify-center gap-2 rounded-20 px-54 py-4 text-heading-lg ${
              isSubmitEnabled
                ? 'cursor-pointer bg-neon-100 text-black'
                : 'cursor-not-allowed bg-gray-20 text-gray-60'
            }`}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
