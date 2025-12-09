import { useMemo, useState } from 'react';

import ActionButton from '@/common/components/ActionButton';
import SmallSchoolCard from '../components/SmallSchoolCard';
import RequestForm from '../components/RequestForm';
import ConfirmModal from '../components/ConfirmModal';
import { useLocation } from 'react-router-dom';
import Header from '@/common/components/Header';
import RequestCategory from '@/Home/components/RequestCategory';

type RequestLocationState = {
  name?: string;
  address?: string;
  schoolId?: number;
};

export default function InfoRequest() {
  const [phone, setPhone] = useState('');
  const [purposeCategory, setPurposeCategory] = useState(''); // 드롭다운
  const [purposeDetail, setPurposeDetail] = useState(''); // textarea
  const [openPopup, setOpenPopup] = useState(false);

  const { state } = useLocation();
  const schoolState = (state || {}) as RequestLocationState;

  const schoolName = schoolState.name ?? '개발용기본중학교고등학교';
  const schoolAddress =
    schoolState.address ?? '아무주소나넣어보자서대문구3로드뷰는이대부초';

  const isValid = useMemo(
    () => phone.trim().length > 0 && purposeDetail.trim().length > 0,
    [phone, purposeDetail]
  );

  //확인 팝업만 뜨게. (실제 제출x)
  const handleSubmit = () => {
    if (!isValid) return;
    setOpenPopup(true);
  };

  const handleConfirm = () => {
    // 실제 제출/요청 API 호출 시엔 여기서
    console.log('SUBMIT:', { phone, purposeCategory, purposeDetail });
    window.history.back();
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Header title="정보 열람 신청" />
      <div className="w-full flex-1">
        <div className="mt-2 mb-6 w-full px-[1.37rem]">
          <SmallSchoolCard name={schoolName} address={schoolAddress} />
        </div>

        {/*정보입력*/}

        <div className="mt-6 flex w-full flex-col gap-[1.19rem] px-[1.37rem] pb-28">
          <div className="flex flex-col gap-3">
            <label className="self-stretch text-base leading-6 font-bold text-black">
              연락처
              <span className="text-[#FF1010]"> *</span>
            </label>
            <RequestForm
              placeholder="예) 010-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="self-stretch text-base leading-6 font-bold text-black">
              정보 열람 목적
              <span className="text-[#FF1010]"> *</span>
            </label>
            <RequestCategory
              value={purposeCategory}
              onChange={setPurposeCategory}
            />
          </div>

          <RequestForm
            type="textarea"
            placeholder={`정보 열람 목적 및 원하는 요소를 \n자세히 작성해 주세요.`}
            value={purposeDetail}
            onChange={(e) => setPurposeDetail(e.target.value)}
          />
        </div>
      </div>
      <div className="sticky bottom-0 w-full max-w-[480px] p-4">
        <ActionButton
          label="신청하기"
          onClick={handleSubmit}
          disabled={!isValid}
        />
      </div>

      <ConfirmModal
        open={openPopup}
        title="정보 열람 신청"
        message={
          '제공받은 개인정보는 \n목적 달성 후 파기됩니다.\n안심하고 신청해 주세요.'
        }
        confirmLabel="확인"
        onClose={() => setOpenPopup(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
