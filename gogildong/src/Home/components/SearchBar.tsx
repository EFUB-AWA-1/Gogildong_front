import React from 'react';
import iconSearch from '../assets/icon_search.svg';
import Logo from '../assets/logo.svg';
import iconSdelete from '../assets/icon_sdelete.svg';
import iconBack from '../../common/assets/backIcon.svg';
import { useNavigate } from 'react-router-dom';

type Props = {
  variant: 'home' | 'detail';
  placeholder?: string;
  value?: string;
  onChangeQuery?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
};

const SearchBar: React.FC<Props> = ({
  variant,
  placeholder = '학교, 주소, 시설 검색',
  value,
  onChangeQuery,
  onSubmit,
  onClear
}) => {
  const navigate = useNavigate();
  const [internalQuery, setInternalQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const query = value !== undefined ? value : internalQuery;

  const handleFocus = () => {
    if (variant === 'home') {
      navigate('/search');
    }
  };

  const updateQuery = (next: string) => {
    if (value === undefined) {
      setInternalQuery(next);
    }
    onChangeQuery?.(next);
  };

  const handleClear = () => {
    updateQuery('');
    if (variant === 'detail') {
      inputRef.current?.focus();
    } else {
      onClear?.();
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      const trimmed = query.trim();
      if (!trimmed) return;
      onSubmit?.(trimmed);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex h-12 w-83 shrink-0 items-center justify-between rounded-[1.25rem] bg-white px-2 shadow-[0_0_12px_rgba(0,0,0,0.10)]">
      {/*로고 및 뒤로가기*/}
      {variant === 'detail' ? (
        <img
          src={iconBack}
          alt="back"
          onClick={handleBack}
          className="mr-2 h-11 w-11 shrink-0 cursor-pointer"
        />
      ) : (
        <img src={Logo} alt="logo" className="mr-2 h-11 w-11" />
      )}

      {/* 입력창 */}
      <input
        ref={inputRef}
        value={query}
        type="text"
        onChange={(e) => updateQuery(e.target.value)}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={variant === 'detail'}
        className="font-[Pretendard Variable] mx-2 w-50 shrink-0 bg-transparent text-left text-body-md leading-6 font-medium text-black placeholder-gray-60 outline-none"
      />

      {/* 검색 및 삭제 아이콘 */}
      {query.length > 0 ? (
        <img
          src={iconSdelete}
          alt="search delete"
          onClick={handleClear}
          className="mr-4 h-4 w-4 cursor-pointer"
        />
      ) : (
        <img src={iconSearch} alt="search" className="h-11 w-11" />
      )}
    </div>
  );
};

export default SearchBar;
