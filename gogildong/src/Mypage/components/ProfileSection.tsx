import DefaultProfileImg from "../assets/profile_default.svg?react";
import ReportIcon from "../assets/icon_report.svg?react";
import AlertIcon from "../assets/icon_alert.svg?react";

type ProfileSectionProps = {
  nickname: string;
  joinedDays: number;
  profileImageUrl?: string | null;
};

export default function ProfileSection({
  nickname,
  joinedDays,
  profileImageUrl
}: ProfileSectionProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-3.75 border-b border-gray-20 bg-[#fff] px-7.75 py-10">
      {/* 프로필 이미지 */}
      <div className="h-20 w-20">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt="프로필 이미지"
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <DefaultProfileImg className="h-20 w-20 rounded-full object-cover" />
        )}
      </div>

      {/* 닉네임 + 가입 기간 */}
      <div className="flex flex-col items-center">
        <p className="text-heading-sm text-black">{nickname}</p>
        <p className="text-body-sm text-[#919191]">
          길동이와 함께한 지 {joinedDays}일째
        </p>
      </div>

      {/* 내 제보 / 신고  버튼 영역 */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <ReportIcon className="h-11 w-11" />
          <span className="text-body-sm text-black">내 제보</span>
        </div>

        <div className="flex flex-col items-center">
          <AlertIcon className="h-11 w-11" />
          <span className="text-body-sm text-black">신고</span>
        </div>
      </div>
    </section>
  );
}
