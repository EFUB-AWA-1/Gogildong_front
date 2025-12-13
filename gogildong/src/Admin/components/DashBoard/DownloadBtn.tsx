import DownloadIcon from '@/Admin/assets/svgs/icon_download.svg?react';

export default function DownloadBtn() {
  return (
    <div className="flex cursor-pointer items-center justify-center rounded-[1.25rem] bg-white p-3">
      <div className="px-4 text-heading-md text-black">
        통계 데이터 다운로드
      </div>
      <DownloadIcon className="h-12 w-12" />
    </div>
  );
}
