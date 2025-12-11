type DesktopHeaderProps = {
  title: string;
  value?: number;
};

export default function DesktopHeader({ title, value }: DesktopHeaderProps) {
  return (
    <div className="flex items-center gap-6 pb-16">
      <span className="text-display-lg text-black">{title}</span>

      {value !== undefined && (
        <span className="text-display-lg text-neon-d">{value}</span>
      )}
    </div>
  );
}
