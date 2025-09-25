import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useStudyStore from "../stores/study";
import type { Tag } from "../types/studyType";

const StudyFinderPage = () => {
  // Zustand 스토어에서 상태와 액션을 가져옵니다.
  const studies = useStudyStore((state) => state.studies);
  const tags = useStudyStore((state) => state.tags);
  const fetchStudies = useStudyStore((state) => state.fetchStudies);
  const fetchTags = useStudyStore((state) => state.fetchTags);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 로딩 상태는 Zustand 스토어에서 직접 가져와도 되지만,
  // 여기서는 단순히 데이터의 유무로 로딩 여부를 판단할게요.
  // (더 나은 방법은 Zustand에 isFetching 상태를 추가하는 것입니다. 이전 대화에서 언급되었죠.)
  const isDataLoading = studies.length === 0 || tags.length === 0;

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 호출
    if (studies.length === 0) {
      fetchStudies();
    }
    if (tags.length === 0) {
      fetchTags();
    }
  }, [fetchStudies, fetchTags, studies.length, tags.length]);

  // 검색 및 필터링 로직 (studies, tags 상태를 기반으로 동작)
  const filteredStudies = studies.filter((study) => {
    const matchesSearchTerm =
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description.toLowerCase().includes(searchTerm.toLowerCase());

    const studyTags = study.tags
      ? study.tags.split(",").map((tag) => tag.trim().toLowerCase())
      : [];

    const matchesSelectedTags =
      selectedTags.length === 0 ||
      selectedTags.every((selectedTag) =>
        studyTags.includes(selectedTag.toLowerCase())
      );

    return matchesSearchTerm && matchesSelectedTags;
  });

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // 데이터 로딩 중 UI
  if (isDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-500 dark:text-gray-400">
          데이터를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-700 dark:text-indigo-400">
          스터디 찾기
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-fit sticky top-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              태그 필터
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map(
                (
                  tagObj: Tag // 태그가 객체 배열임을 명시
                ) => (
                  <button
                    key={tagObj.id}
                    onClick={() => handleTagClick(tagObj.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${
                      selectedTags.includes(tagObj.name)
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    #{tagObj.name}
                  </button>
                )
              )}
            </div>
          </aside>

          <main className="lg:w-3/4">
            <div className="mb-8">
              <input
                type="text"
                placeholder="스터디 제목 또는 설명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 rounded-lg border-2 border-gray-300 focus:border-indigo-500 outline-none
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-indigo-400 text-lg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStudies.length > 0 ? (
                filteredStudies.map((study) => (
                  <Link
                    key={study.id}
                    to={`/studies/${study.id}`}
                    className="block"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 h-full flex flex-col justify-between transform transition duration-300 hover:scale-102 hover:shadow-2xl cursor-pointer">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {study.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                          {study.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {study.tags &&
                            study.tags.split(",").map((tag, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
                              >
                                {tag.trim()}
                              </span>
                            ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-300 mt-auto">
                        <p>시작일: {study.startDate}</p>
                        <p>기간: {study.duration}</p>
                        <p>
                          인원: {study.currentParticipants} /{" "}
                          {study.maxParticipants}명
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400 text-lg">
                  {searchTerm || selectedTags.length > 0
                    ? "검색/필터링 조건에 맞는 스터디가 없습니다."
                    : "아직 생성된 스터디가 없습니다."}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudyFinderPage;
