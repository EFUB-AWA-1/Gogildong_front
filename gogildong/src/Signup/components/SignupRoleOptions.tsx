import SignupRoleOption from "./SignupRoleOption";

export interface SignupRoleOptionItem {
  id: string;
  title: string;
  description: string;
}

interface SignupRoleOptionsProps {
  options: SignupRoleOptionItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function SignupRoleOptions({
  options,
  selectedId,
  onSelect
}: SignupRoleOptionsProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <SignupRoleOption
          key={option.id}
          title={option.title}
          description={option.description}
          selected={selectedId === option.id}
          onClick={() => onSelect(option.id)}
        />
      ))}
    </div>
  );
}
