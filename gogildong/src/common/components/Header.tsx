import { useNavigate } from 'react-router-dom';
import BackIcon from '@/assets/backIcon.svg?react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackClick?: () => void;
  darkMode?: boolean;
  rightElement?: React.ReactNode;
  transparentMode?: boolean;
}

export default function Header({
  title,
  showBack = true,
  onBackClick,
  darkMode = false,
  rightElement,
  transparentMode = false
}: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackClick) onBackClick();
    else navigate(-1);
  };

  return (
    <header
      className={`sticky top-0 z-10 grid w-full grid-cols-3 items-center px-4 py-2 ${
        darkMode ? 'text-white' : 'text-black'
      } ${
        transparentMode ? 'bg-transparent' : darkMode ? 'bg-black' : 'bg-white'
      }`}
    >
      {showBack && (
        <button
          className="cursor-pointer"
          onClick={handleBack}
          aria-label="뒤로 가기"
        >
          <BackIcon
            className={darkMode ? '[&_path]:fill-white' : '[&_path]:fill-black'}
          />
        </button>
      )}
      <div className="flex justify-center">
        <p className="text-body-bold-lg">{title}</p>
      </div>
      <div className="flex justify-end">{rightElement}</div>
    </header>
  );
}
