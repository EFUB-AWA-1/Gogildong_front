export default function Tag({ tag }: { tag: string }) {
  return (
    <div
      className="flex h-4 py-px px-1.5 
                    justify-center items-center gap-2 rounded-[1.25rem] 
                    bg-[#AAEB2F] shadow-[0_0_12px_0_rgba(0,0,0,0.10)]
                    text-black text-center font-pretendard text-caption-xs font-normal leading-150"
    >
      {tag}
    </div>
  );
}
