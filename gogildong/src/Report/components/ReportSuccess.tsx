import { useNavigate } from "react-router-dom";

export default function ReportSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-body-bold-lg text-black">
        제보가 성공적으로 등록되었어요!
      </p>
      <p className="text-gray-70 text-body-md">
        <span className="text-body-bold-sm">nn 포인트</span>가 지급되었습니다.
        <br />
        <span
          onClick={() => navigate("/mypage")}
          className="cursor-pointer underline"
        >
          마이페이지
        </span>
        에서 확인해 보세요!
      </p>
    </div>
  );
}
