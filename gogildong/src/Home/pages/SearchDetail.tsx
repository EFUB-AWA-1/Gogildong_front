import SearchBar from "../components/SearchBar";
import HomeBlackIcon from "../assets/icon_home_black.svg?react";
import DeleteIcon from "../assets/icon_delete.svg?react";
import SearchIcon from "../assets/icon_search.svg?react";

export default function SearchDetail() {
  return (
    <div className="flex flex-col justify-end items-center">
      <div className="fixed top-18 z-50">
        <SearchBar variant="detail" />
      </div>
      <div className="mt-[8.38rem] flex w-full flex-col items-start">
        <div
          className="flex h-13 px-5 py-4 items-center gap-2 self-stretch
                        text-black text-center text-[0.875rem] font-bold leading-150"
        >
          최근 검색
        </div>

        <div
          className="flex h-13 px-3 items-center self-stretch
                       border-b border-gray-20"
        >
          <HomeBlackIcon className="w-10 h-10 mr-2" />
          <div className="w-65 text-black text-left  text-[0.875rem] font-bold leading-150">
            이화여대부속초등학교
          </div>
          <DeleteIcon className="ml-auto w-10 h-10 cursor-pointer" />
        </div>

        <div
          className="flex h-13 px-3 items-center self-stretch
                       border-b border-gray-20"
        >
          <SearchIcon className="w-10 h-10 mr-2" />
          <div className="w-65 text-black text-left  text-[0.875rem] font-bold leading-150">
            서대문구
          </div>
          <DeleteIcon className="ml-auto w-10 h-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
