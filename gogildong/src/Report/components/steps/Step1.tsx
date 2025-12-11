import toilet1 from '@/Report/assets/imgs/toilet1.png';
import elevator1 from '@/Report/assets/imgs/elevator1.png';
import other1 from '@/Report/assets/imgs/other1.png';
import type { FacilityType } from '@/Report/types/facilityTypes';

const GUIDE_MESSAGE: Partial<Record<FacilityType, string>> = {
  화장실: `화장실 문 앞
살짝 떨어진 곳에서
촬영해 주세요`,
  엘리베이터: `엘리베이터에서 전면이 보이도록
적당히 떨어진 거리에서
촬영해 주세요`,
  교실: `교실의 문앞에서
살짝 떨어진 곳에서
촬영해 주세요`,
  기타: `기타 제보하고 싶은 내용을 
사진과 함께 자유롭게 
등록해 주세요`
};

interface Step1Props {
  facilityType: FacilityType;
}

export default function Step1({ facilityType }: Step1Props) {
  const message = GUIDE_MESSAGE[facilityType] ?? GUIDE_MESSAGE.기타 ?? '';
  const IMAGE_BY_TYPE: Partial<Record<FacilityType, string>> = {
    화장실: toilet1,
    엘리베이터: elevator1,
    교실: toilet1,
    기타: other1
  };
  const imageSrc = IMAGE_BY_TYPE[facilityType];
  return (
    <div className="flex flex-col items-center justify-start gap-25 text-center text-neon-100">
      <p className="mt-10 text-heading-md whitespace-pre-line">{message}</p>
      <img src={imageSrc} alt="촬영 가이드 1" />
    </div>
  );
}
