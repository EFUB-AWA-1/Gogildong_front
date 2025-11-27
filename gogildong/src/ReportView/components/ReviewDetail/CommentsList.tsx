import CommentItem from "./CommentItem";
import type { Comment } from "@/ReportView/types/reviewComment";

type CommentsListProps = {
  comments: Comment[];
};

export default function CommentsList({ comments }: CommentsListProps) {
  const hasComments = comments.length > 0;

  return (
    <section className="mt-4 flex h-full w-full flex-col px-4">
      <div className="mb-4 flex h-6.5 items-center justify-start gap-2.5 px-2.5">
        <span className="text-[0.875rem] leading-5.25 font-medium text-black">
          댓글
        </span>
        <span className="text-[0.875rem] leading-5.25 font-bold text-neon-100">
          {comments.length}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-[1.94rem] overflow-y-auto pb-24">
        {hasComments ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.commentId}
              nickname={comment.userName}
              date={comment.date}
              content={comment.commentText}
            />
          ))
        ) : (
          // 댓글없음
          <div className="flex h-22.75 w-full flex-col items-center justify-center text-center">
            <p className="text-[0.875rem] leading-5.25 font-bold text-black">
              등록된 댓글이 없어요.
            </p>
            <p className="text-[0.875rem] leading-5.25 font-medium text-black">
              가장 먼저 댓글을 달아 보세요.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
