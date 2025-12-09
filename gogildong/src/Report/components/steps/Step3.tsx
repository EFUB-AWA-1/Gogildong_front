import toiletStep3 from '@/Report/assets/imgs/toilet3.png';

import type { FacilityType } from '@/Report/types/facilityTypes';

const GUIDE_MESSAGE: Partial<Record<FacilityType, string>> = {
  화장실: `화장실 칸 안에
사람이 없는 것을
꼭 확인해 주세요!`,

  교실: `사진 안에 
사람이 나오지 않도록
주의해 주세요`
};

interface Step3Props {
  facilityType: FacilityType;
}

export default function Step3({ facilityType }: Step3Props) {
  const message = GUIDE_MESSAGE[facilityType] ?? GUIDE_MESSAGE.기타 ?? '';
  const IMAGE_BY_TYPE: Partial<Record<FacilityType, string>> = {
    화장실: toiletStep3,

    교실: toiletStep3
  };
  const guideImg = IMAGE_BY_TYPE[facilityType];
  return (
    <div className="flex flex-col items-center gap-9 text-center text-neon-100">
      <p className="mt-10 text-heading-md whitespace-pre-line">{message}</p>
      <img src={guideImg} alt="촬영 가이드 3" />
    </div>
  );
}
