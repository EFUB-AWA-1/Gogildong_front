import { useState } from "react";

const PLACEHOLDER_TEXT = `욕설/비방 없이 바르게 작성해주세요.
부적절한 내용은 관리자의 신고 처리 후
삭제될 수 있습니다.`;

type ReviewFormProps = {
  review: string;
  setReview: React.Dispatch<React.SetStateAction<string>>;
  maxLength?: number;
};

export default function ReviewForm({
  review,
  setReview,
  maxLength = 500
}: ReviewFormProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const isOver = review.length > maxLength;

  return (
    <div className="mt-6 mb-[1.94rem] w-full self-stretch px-5">
      <p className="text-body-bold-md self-stretch leading-150 text-black">
        해당 장소에 대한 리뷰를 자세히 적어 주세요.
      </p>
      <p className="text-body-bold-xs mt-1 self-stretch text-[0.75rem] leading-150 text-gray-40">
        (ex. 다른 이용자에게 도움이 될 내용이나 개선이 필요한 사항)
      </p>

      {/* input box*/}
      <div className="mt-4 flex w-full flex-wrap content-end items-end gap-y-1.75 self-stretch">
        <textarea
          value={review}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? "" : PLACEHOLDER_TEXT}
          className="flex h-40 max-h-40 w-full resize-none items-start gap-2 rounded-xl border border-gray-20 p-4.25 text-body-sm text-black placeholder:text-gray-40 focus:ring-0 focus:outline-none"
        />

        {/* 글자수 */}
        <div className="mt-[0.44rem] flex w-full items-center justify-between text-caption-md">
          <span className="text-[#A9A9A9]">15자 이상</span>
          <span className={isOver ? "text-warning-100" : "text-[#A9A9A9]"}>
            {review.length}/{maxLength}
          </span>
        </div>
      </div>
    </div>
  );
}
