import CommentItem from "./CommentItem";
import type { Comment } from "@/ReportView/types/reviewComment";

type CommentsListProps = {
  comments: Comment[];
  currentUserId?: number;
  onDelete?: (commentId: number) => void;
  onReport?: (commentId: number) => void; // 신고 핸들러 prop
};

export default function CommentsList({ 
  comments, 
  currentUserId, 
  onDelete, 
  onReport 
}: CommentsListProps) {
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
          comments.map((comment) => {
            const isMine = currentUserId === comment.userId;
            return (
              <CommentItem
                key={comment.commentId}
                nickname={comment.userName}
                date={comment.date}
                content={comment.commentText}
                isMine={isMine}
                // 삭제 및 신고 핸들러 연결
                onDelete={() => onDelete && onDelete(comment.commentId)}
                onReport={() => onReport && onReport(comment.commentId)}
              />
            );
          })
        ) : (
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