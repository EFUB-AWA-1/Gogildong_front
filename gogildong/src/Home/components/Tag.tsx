export default function Tag({ tag }: { tag: string }) {
  return (
    <div className="font-pretendard flex h-4 items-center justify-center gap-2 rounded-20 bg-[#AAEB2F] px-1.5 py-px text-center text-caption-xs leading-150 font-normal text-black shadow-[0_0_12px_0_rgba(0,0,0,0.10)]">
      {tag}
    </div>
  );
}
