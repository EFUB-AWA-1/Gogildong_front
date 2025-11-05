import React from "react";
import iconSearch from "../../assets/Home/icon_search.svg";
import Logo from "../../assets/Home/logo.svg";
import iconSdelete from "../../assets/Home/icon_sdelete.svg";
import iconBack from "../../assets/Home/icon_back.svg";
import { useNavigate } from "react-router-dom";

type Props = {
  variant: "home" | "detail";
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({
  variant,
  placeholder = "학교, 주소, 시설 검색",
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (variant === "home") {
      navigate("/search");
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      // TODO: 엔터 검색 로직 연결 (API 호출/페이지 이동 등)
      // 예: navigate(`/search?query=${encodeURIComponent(query)}`)
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
      className="flex justify-between items-center shrink-0 
                 w-[20.75rem] h-12 px-2 
                 rounded-[1.25rem] 
                 bg-(--color-white) 
                 shadow-[0_0_12px_rgba(0,0,0,0.10)]"
    >
      {/*로고*/}
      {variant === "detail" ? (
        <img
          src={iconBack}
          alt="back"
          onClick={handleBack}
          className="w-11 h-11 shrink-0 cursor-pointer"
        />
      ) : (
        <img src={Logo} alt="logo" className="w-11 h-11 mr-2" />
      )}

      {/* 입력창 */}
      <input
        ref={inputRef}
        value={query}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={variant === "detail"}
        className="w-50 mx-2 text-left shrink-0
                   text-body-md font-medium leading-6
                   text-(--color-black) placeholder-(--color-gray-60)
                   font-[Pretendard Variable] 
                   bg-transparent outline-none"
      />

      {/* 검색 및 삭제 아이콘 */}
      {variant === "detail" && query.length > 0 ? (
        <img
          src={iconSdelete}
          alt="search delete"
          onClick={handleClear}
          className="w-4 h-4 mr-4 cursor-pointer"
        />
      ) : (
        <img src={iconSearch} alt="search" className="w-11 h-11" />
      )}
    </div>
  );
};

export default SearchBar;
