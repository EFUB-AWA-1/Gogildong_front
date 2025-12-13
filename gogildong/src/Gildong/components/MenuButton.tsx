import type { ReactNode } from 'react';

type ButtonElement = {
  buttonName: string;
  buttonIcon: ReactNode;
  onClick?: () => void;
  selected?: boolean;
};

export default function MenuButton({
  buttonName,
  buttonIcon,
  onClick,
  selected = false
}: ButtonElement) {
  return (
    <div className="inline-flex flex-col items-center justify-start gap-2.5 overflow-hidden p-2.5">
      <div
        onClick={onClick}
        className={`flex cursor-pointer flex-col items-center justify-start overflow-hidden rounded-4xl p-2.5 outline outline-1 outline-offset-[-1px] outline-lime-400 hover:bg-lime-400 ${
          selected
            ? 'bg-lime-400 outline-lime-400'
            : 'bg-white outline-lime-400 hover:bg-lime-200'
        }`}
      >
        <div>
          <div>{buttonIcon}</div>
        </div>
      </div>
      <div className="justify-center text-center text-sm leading-5 font-medium text-zinc-800">
        {buttonName}
      </div>
    </div>
  );
}
