import RankingMenu from '@/Gildong/components/ranking/RankingMenu';

const menuItems = [
  { label: '전체', type: 'all' },
  { label: '교내', type: 'campus' },
  { label: '학교', type: 'school' }
];

export default function RankingMenuBar({
  activeType,
  onChangeType
}: {
  activeType: string;
  onChangeType: (type: string) => void;
}) {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-5 bg-white px-4">
      {menuItems.map((item) => (
        <RankingMenu
          key={item.type}
          title={item.label}
          selected={activeType === item.type}
          onClick={() => onChangeType(item.type)}
        />
      ))}
    </div>
  );
}
