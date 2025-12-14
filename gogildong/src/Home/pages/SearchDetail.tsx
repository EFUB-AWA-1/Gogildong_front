import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import HomeBlackIcon from "../assets/icon_home_black.svg?react";
import DeleteIcon from "../assets/icon_delete.svg?react";
import SearchIcon from "../assets/icon_search.svg?react";

import type { School } from "../types/school";
import { searchSchools } from "../api/searchSchoolApi";

type RecentType = "school" | "region";

type RecentSearch = {
  id: number;
  keyword: string;
  type: RecentType;
  schoolId?: number;
  schoolData?: School; 
};

const RECENT_STORAGE_KEY = "recent_school_searches";
const MAX_RECENT = 10;

// 로컬스토리지 불러오기
function loadRecent(): RecentSearch[] {
  try {
    const raw = window.localStorage.getItem(RECENT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RecentSearch[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

// 로컬스토리지 저장하기
function saveRecent(list: RecentSearch[]) {
  try {
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export default function SearchDetail() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<RecentSearch[]>(() => loadRecent());
  const [suggestionsOpen, setSuggestionsOpen] = useState(true);
  
  const [suggestions, setSuggestions] = useState<School[]>([]);
  
  // 디바운스 타이머 Ref
  const debounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      setSuggestionsOpen(false);
      return;
    }

    // 이전에 예약된 호출 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 300ms 동안 입력이 없으면 API 호출
    debounceTimerRef.current = window.setTimeout(async () => {
      try {
        const response = await searchSchools(trimmed);
        setSuggestions(response.schools);
        setSuggestionsOpen(true);
      } catch (error) {
        console.error("검색 실패:", error);
        setSuggestions([]);
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [query]);


  const upsertRecent = (item: Omit<RecentSearch, "id">) => {
    setRecent((prev) => {
      // 중복 제거 (키워드 & 타입 & 학교ID가 같으면 삭제 후 상단에 추가)
      const filtered = prev.filter(
        (r) =>
          !(
            r.keyword === item.keyword &&
            r.type === item.type &&
            (r.schoolId ?? null) === (item.schoolId ?? null)
          )
      );
      const next: RecentSearch[] = [
        { ...item, id: Date.now() },
        ...filtered
      ].slice(0, MAX_RECENT);

      saveRecent(next);
      return next;
    });
  };

  const handleRemoveRecent = (id: number) => {
    setRecent((prev) => {
      const next = prev.filter((r) => r.id !== id);
      saveRecent(next);
      return next;
    });
  };

  const handleSubmit = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    // 최근 검색어 저장 (지역/키워드 타입)
    upsertRecent({
      keyword: trimmed,
      type: "region"
    });

    setSuggestionsOpen(false);

    try {
      const response = await searchSchools(trimmed);
      const results = response.schools;

      if (results.length === 1) {
        const school = results[0];
        navigate(`/school/${school.schoolId}`, {
          state: {
            schoolId: school.schoolId,
            name: school.schoolName,
            address: school.address,
            latitude: school.latitude,
            longitude: school.longitude
          }
        });
        return;
      }

      // Case 2: 결과가 여러 개면 Home 지도에 뿌려주기
      if (results.length > 1) {
        navigate("/home", {
          state: {
            keyword: trimmed,
            schools: results
          }
        });
        return;
      }
      // Case 3: 결과가 없으면 알림
      console.log("검색 결과가 없습니다.");

    } catch (e) {
      console.error(e);
    }
  };


  const handleSelectSuggestion = (school: School) => {
    // 최근 검색어 저장 (학교 타입, 상세 정보 포함)
    upsertRecent({
      keyword: school.schoolName,
      type: "school",
      schoolId: school.schoolId,
      schoolData: school 
    });

    setSuggestionsOpen(false);

    // 상세 페이지 이동
    navigate(`/school/${school.schoolId}`, {
      state: {
        schoolId: school.schoolId,
        name: school.schoolName,
        address: school.address,
        latitude: school.latitude,
        longitude: school.longitude
      }
    });
  };


  const handleClickRecent = async (item: RecentSearch) => {
    // Type A: 학교 검색 기록
    if (item.type === "school" && item.schoolId) {
      // 1순위: 저장된 schoolData가 있으면 바로 이동
      if (item.schoolData) {
        navigate(`/school/${item.schoolId}`, {
          state: {
            schoolId: item.schoolId,
            name: item.schoolData.schoolName,
            address: item.schoolData.address,
            latitude: item.schoolData.latitude,
            longitude: item.schoolData.longitude
          }
        });
        return;
      }

      // 2순위: 데이터가 없으면 검색 로직 다시 수행 (이름으로 검색)
      handleSubmit(item.keyword);
      return;
    }

    // Type B: 일반 키워드(지역) 검색 기록
    setQuery(item.keyword);
    setSuggestionsOpen(false);
    handleSubmit(item.keyword);
  };

  return (
    <div className="flex flex-col items-center justify-end">
      <div className="fixed top-18 z-50">
        <SearchBar
          variant="detail"
          value={query}
          onChangeQuery={setQuery}
          onSubmit={handleSubmit}
        />
      </div>

      {/* 자동완성 드롭다운 */}
      {suggestionsOpen && suggestions.length > 0 && (
        <div className="fixed top-[7.2rem] z-40 w-83">
          <div className="mt-2 max-h-80 overflow-y-auto rounded-2xl bg-white shadow-[0_0_12px_rgba(0,0,0,0.10)]">
            {suggestions.map((school) => (
              <button
                key={school.schoolId}
                type="button"
                className="flex w-full items-center border-b border-gray-20 px-3 py-3 text-left last:border-b-0 hover:bg-gray-50"
                onClick={() => handleSelectSuggestion(school)}
              >
                <HomeBlackIcon className="mr-2 h-10 w-10 shrink-0" />
                <div>
                  <div className="text-[0.875rem] leading-150 font-bold text-black">
                    {school.schoolName}
                  </div>
                  <div className="text-[0.75rem] leading-150 text-gray-60">
                    {school.address}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 최근 검색 리스트 */}
      <div className="mt-[8.38rem] flex w-full flex-col items-start">
        <div className="flex h-13 items-center gap-2 self-stretch px-5 py-4 text-center text-[0.875rem] leading-150 font-bold text-black">
          최근 검색
        </div>

        {recent.map((item) => (
          <div
            key={item.id}
            className="flex h-13 cursor-pointer items-center self-stretch border-b border-gray-20 px-3 hover:bg-gray-50"
            onClick={() => handleClickRecent(item)}
          >
            {item.type === "school" ? (
              <HomeBlackIcon className="mr-2 h-10 w-10 shrink-0" />
            ) : (
              <SearchIcon className="mr-2 h-10 w-10 shrink-0" />
            )}
            <div className="w-65 truncate text-left text-[0.875rem] leading-150 font-bold text-black">
              {item.keyword}
            </div>
            <DeleteIcon
              className="ml-auto h-10 w-10 shrink-0 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveRecent(item.id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}