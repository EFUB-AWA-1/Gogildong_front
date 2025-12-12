type MenuElement = {
  title: string;
  selected: boolean;
  onClick?: () => void;
};

export default function RankingMenu({ title, selected, onClick }: MenuElement) {
  return (
    <div
      onClick={onClick}
      className={`flex h-12 flex-1 cursor-pointer items-center justify-center border-b-2 ${selected ? 'border-black font-bold text-zinc-800' : 'border-transparent font-bold text-neutral-400'} bg-white transition-all duration-200 ease-in-out hover:border-lime-400 hover:bg-lime-50 hover:text-zinc-900`}
    >
      <div className="text-center text-base leading-6">{title}</div>
    </div>
  );
}
