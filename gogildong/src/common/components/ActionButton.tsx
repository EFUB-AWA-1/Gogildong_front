interface ActionButtonProps {
  label: string;
  className?: string;
}

export default function ActionButton({ label, className }: ActionButtonProps) {
  return (
    <>
      <button className={`bg-neon-100 w-full py-3.5 rounded-3xl ${className}`}>
        {label}
      </button>
    </>
  );
}
