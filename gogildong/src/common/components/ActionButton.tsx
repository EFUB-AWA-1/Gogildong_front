interface ActionButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

export default function ActionButton({
  label,
  className,
  onClick,
}: ActionButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`bg-neon-100 w-full py-3.5 rounded-3xl ${className}`}>
        {label}
      </button>
    </>
  );
}
