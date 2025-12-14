import type { Clothing } from '@/Gildong/types/Clothing';
import ClothingItem from './ClothingItem';

type Props = {
  clothes: Clothing[];
  onSelect?: (clothing: Clothing) => void;
};

export default function ClothingGrid({ clothes, onSelect }: Props) {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-6 scroll-hide">
      {clothes.map((clothing: Clothing) => (
        <ClothingItem
          key={clothing.id}
          clothing={clothing}
          onClick={() => onSelect?.(clothing)}
        />
      ))}
    </div>
  );
}
