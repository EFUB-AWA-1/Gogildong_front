import SearchBar from "../components/SearchBar";
import HomeBlackIcon from "../assets/icon_home_black.svg?react";
import DeleteIcon from "../assets/icon_delete.svg?react";
import SearchIcon from "../assets/icon_search.svg?react";
import { dummySchools } from "../types/school-search";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { School } from "../types/school";

type RecentType = "school" | "region";

type RecentSearch = {
  id: number; // timestamp 등
  keyword: string;
  type: RecentType;
  schoolId?: number; // type === "school"일 때만
};

const RECENT_STORAGE_KEY = "recent_school_searches";
const MAX_RECENT = 10;

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

function saveRecent(list: RecentSearch[]) {
  try {
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // 로컬스토리지 실패해도 앱 흐름은 유지
  }
}

export default function SearchDetail() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<RecentSearch[]>(() => loadRecent());
  const [suggestionsOpen, setSuggestionsOpen] = useState(true);

  // 자동완성 후보 (학교 기준)
  const suggestions: School[] = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    const lower = trimmed.toLowerCase();

    return dummySchools.filter(
      (school) =>
        school.schoolName.toLowerCase().includes(lower) ||
        school.address.toLowerCase().includes(lower)
    );
  }, [query]);

  // 최근 검색 리스트 업데이트 + 저장
  const upsertRecent = (item: Omit<RecentSearch, "id">) => {
    setRecent((prev) => {
      // 동일한 조건(타입 + keyword + schoolId)이 있으면 맨 위로 올림
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

  const handleSubmit = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    upsertRecent({
      keyword: trimmed,
      type: "region"
    });

    // 현재 query 기준 자동완성 결과가 1개인 경우 → 해당 학교로 바로 이동
    if (suggestions.length === 1) {
      const school = suggestions[0];

      setSuggestionsOpen(false);

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

    //2) 검색 결과 여러 개
    if (suggestions.length > 1) {
      setSuggestionsOpen(false);

      navigate("/home", {
        state: {
          keyword: trimmed, // Home 상단 검색창에 그대로 표시할 값
          schools: suggestions // 지도에 찍을 학교 목록
        }
      });
      return;
    }

    // 3) suggestions.length === 0 인 경우
    // → 나중에 "지역 기반 검색 API" 붙일 때 여기서 처리하면 됨
    setSuggestionsOpen(false);
  };

  const handleSelectSuggestion = (school: School) => {
    // 최근 검색에 학교 타입으로 추가
    upsertRecent({
      keyword: school.schoolName,
      type: "school",
      schoolId: school.schoolId
    });

    setSuggestionsOpen(false);

    // 실제 학교 상세 페이지로 이동 (state에 정보 전달)
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

  const handleClickRecent = (item: RecentSearch) => {
    if (item.type === "school" && item.schoolId) {
      const school = dummySchools.find((s) => s.schoolId === item.schoolId);
      if (!school) return;

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

    // region 타입이면 그냥 검색어 다시 채워주고 엔터 검색
    setQuery(item.keyword);
    setSuggestionsOpen(false);
    // 실제 검색 로직을 다시 태우고 싶으면 아래처럼:
    handleSubmit(item.keyword);
  };

  // 검색창 변경 시 자동완성 다시 열리게
  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestionsOpen(false);
      return;
    }
    setSuggestionsOpen(true);
  }, [query]);

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

      {/* 자동완성 드롭다운 (검색바 바로 아래, 스타일은 새로만 추가) */}
      {suggestionsOpen && suggestions.length > 0 && (
        <div className="fixed top-[7.2rem] z-40 w-83">
          <div className="mt-2 max-h-80 overflow-y-auto rounded-2xl bg-white shadow-[0_0_12px_rgba(0,0,0,0.10)]">
            {suggestions.map((school) => (
              <button
                key={school.schoolId}
                type="button"
                className="flex w-full items-center border-b border-gray-20 px-3 py-3 text-left last:border-b-0"
                onClick={() => handleSelectSuggestion(school)}
              >
                <HomeBlackIcon className="mr-2 h-10 w-10" />
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
            className="flex h-13 cursor-pointer items-center self-stretch border-b border-gray-20 px-3"
            onClick={() => handleClickRecent(item)}
          >
            {item.type === "school" ? (
              <HomeBlackIcon className="mr-2 h-10 w-10" />
            ) : (
              <SearchIcon className="mr-2 h-10 w-10" />
            )}
            <div className="w-65 text-left text-[0.875rem] leading-150 font-bold text-black">
              {item.keyword}
            </div>
            <DeleteIcon
              className="ml-auto h-10 w-10 cursor-pointer"
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
