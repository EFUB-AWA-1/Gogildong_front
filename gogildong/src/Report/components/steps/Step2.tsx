import toilet2 from '@/Report/assets/imgs/toilet2.png';
import elevator2 from '@/Report/assets/imgs/elevator2.png';
import type { FacilityType } from '@/Report/types/facilityTypes';

const GUIDE_MESSAGE: Partial<Record<FacilityType, string>> = {
  화장실: `가이드에 맞춰
문의 양 옆 테두리가
나오도록 촬영해 주세요`,
  엘리베이터: `가이드에 맞춰
문의 위아래 테두리가
나오도록 촬영해 주세요`,
  교실: `가이드에 맞춰 
문의 위아래 테두리가 
나오도록 촬영해 주세요`
};

interface Step2Props {
  facilityType: FacilityType;
}

export default function Step2({ facilityType }: Step2Props) {
  const message = GUIDE_MESSAGE[facilityType] ?? GUIDE_MESSAGE.기타 ?? '';
  const IMAGE_BY_TYPE: Partial<Record<FacilityType, string>> = {
    화장실: toilet2,
    엘리베이터: elevator2,
    교실: toilet2
  };
  const guideImg = IMAGE_BY_TYPE[facilityType];
  return (
    <div className="flex flex-col items-center gap-25 text-center text-neon-100">
      <p className="mt-10 text-heading-md whitespace-pre-line">{message}</p>
      <div className="flex w-100 justify-end">
        <img src={guideImg} alt="촬영 가이드 2" />
      </div>
    </div>
  );
}
