type MenuItemProps = {
  label: string;
  rightText?: string;
  onClick?: () => void;
};

export default function MenuItem({ label, rightText, onClick }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex h-11 w-full cursor-pointer items-center justify-between rounded-2xl px-[0.44rem] hover:bg-gray-10 active:bg-gray-20"
    >
      <div className="text-body-sm text-black">{label}</div>
      {rightText && (
        <div className="text-body-sm text-gray-60">{rightText}</div>
      )}
    </div>
  );
}
