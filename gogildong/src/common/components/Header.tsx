import { useNavigate } from 'react-router-dom';
import BackIcon from '@/assets/backIcon.svg?react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackClick?: () => void;
  darkMode?: boolean;
}

export default function Header({
  title,
  showBack = true,
  onBackClick,
  darkMode = false,
}: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackClick) onBackClick();
    else navigate(-1);
  };

  return (
    <header
      className={`fixed top-0 grid grid-cols-3 items-center w-full px-4 py-2 ${
        darkMode ? 'text-white' : 'text-black'
      }`}>
      {showBack && (
        <button
          className='cursor-pointer'
          onClick={handleBack}
          aria-label='뒤로 가기'>
          <BackIcon
            className={darkMode ? '[&_path]:fill-white' : '[&_path]:fill-black'}
          />
        </button>
      )}
      <div className='flex justify-center'>
        <p className='text-body-bold-lg'>{title}</p>
      </div>
    </header>
  );
}
