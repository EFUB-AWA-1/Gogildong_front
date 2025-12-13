import type { ReactNode } from 'react';

type ButtonElement = {
  buttonName: string;
  buttonIcon: ReactNode;
  onClick?: () => void;
};

export default function MenuButton({ buttonName, buttonIcon, onClick }: ButtonElement) {
  return (
    <div className="inline-flex flex-col items-center justify-start gap-2.5 overflow-hidden p-2.5">
      <div onClick={onClick} className="bg-white hover:bg-lime-400 cursor-pointer flex flex-col items-center justify-start overflow-hidden rounded-4xl p-2.5 outline outline-1 outline-offset-[-1px] outline-lime-400">
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
