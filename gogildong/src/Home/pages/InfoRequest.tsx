import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ActionButton from "@/common/components/ActionButton";
import InfoRequestHeader from "../components/InfoRequestHeader";
import SmallSchoolCard from "../components/SmallSchoolCard";
import RequestForm from "../components/RequestForm";
import ConfirmModal from "../components/ConfirmModal";

export default function InfoRequest() {
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  const navigate = useNavigate();

  const isValid = useMemo(
    () => phone.trim().length > 0 && purpose.trim().length > 0,
    [phone, purpose]
  );

  const handleSubmit = () => {
    if (!isValid) return;
    setOpenPopup(true);
  };

  const handleConfirm = () => {
    // 실제 제출/요청 API 호출 시엔 여기서
    console.log("SUBMIT:", { phone, purpose });
    navigate("/home");
  };

  return (
    <div className="relative flex flex-col justify-end items-center">
      <div className="w-full">
        <InfoRequestHeader />
      </div>
      <div className="w-full px-[1.37rem] mb-6">
        <SmallSchoolCard />
      </div>

      {/*정보입력*/}
      <div className="w-full px-[1.37rem] mt-6 pb-28 flex flex-col gap-[1.19rem]">
        <RequestForm
          label="연락처"
          placeholder="예) 010-1234-5678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <RequestForm
          label="정보 열람 목적"
          type="textarea"
          placeholder={`정보 열람 목적 및 원하는 요소를 \n자세히 작성해 주세요.`}
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </div>

      <div className="w-full p-4 fixed bottom-0 ">
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
          "제공받은 개인정보는 \n목적 달성 후 파기됩니다.\n안심하고 신청해 주세요."
        }
        confirmLabel="확인"
        onClose={() => setOpenPopup(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
