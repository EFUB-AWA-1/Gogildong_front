import iconSearch from "../../assets/Home/icon_search.svg";
import Logo from "../../assets/Home/logo.svg";

const SearchBar = () => {
  return (
    <div
      className="flex justify-between items-center shrink-0 
                 w-[20.75rem] h-12 px-2 
                 rounded-[1.25rem] 
                 bg-(--color-white) 
                 shadow-[0_0_12px_rgba(0,0,0,0.10)]"
    >
      {/*로고*/}
      <img src={Logo} alt="logo" className="w-11 h-11 mr-2" />

      {/* 입력창 */}
      <input
        type="text"
        placeholder="학교, 주소, 시설 검색"
        className="w-50 mx-2 text-left shrink-0
                   text-body-md font-medium leading-6
                   text-(--color-black) placeholder-(--color-gray-60)
                   font-[Pretendard Variable] 
                   bg-transparent outline-none"
      />

      {/* 검색 아이콘 */}
      <img src={iconSearch} alt="search" className="w-11 h-11" />
    </div>
  );
};

export default SearchBar;
