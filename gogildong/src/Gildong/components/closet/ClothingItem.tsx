import { useCharacterStore } from '@/Gildong/stores/useCharacterStore';
import type { Clothing } from '@/Gildong/types/Clothing';

type Props = {
  clothing: Clothing;
  onClick?: () => void;
};

export default function ClothingItem({ clothing, onClick }: Props) {
  const currentItem = useCharacterStore((state) =>
    state.getItemByType(clothing.type)
  );

  const isActive = currentItem?.itemId === clothing.id;
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2">
      {/* 카드 */}
      <div
        className={`relative flex h-28 w-28 items-center justify-center rounded-[20px] bg-white shadow-[0px_0px_12px_rgba(0,0,0,0.10)] ${isActive ? 'ring-1 ring-neon-100' : ''} `}
      >
        {clothing.imageUrl ? (
          <img
            src={clothing.imageUrl}
            alt={clothing.name}
            className="h-20 w-20 object-contain"
          />
        ) : (
          <div className="h-10 w-10 rounded-md border border-neon-100" />
        )}
      </div>

      {/* 이름 */}
      <span className="font-medium text-zinc-800">{isActive ? "현재 착용 중" : clothing.name}</span>
    </button>
  );
}
