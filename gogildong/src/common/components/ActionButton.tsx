interface ActionButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function ActionButton({
  label,
  className,
  onClick,
  disabled = false,
  type = "button"
}: ActionButtonProps) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`w-full py-3.5 rounded-3xl ${className} ${
          disabled ? "bg-gray-20 " : "bg-neon-100 cursor-pointer"
        } text-black text-base font-bold`}
      >
        {label}
      </button>
    </>
  );
}
