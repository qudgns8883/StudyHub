import React from "react";

const studies = [
  {
    id: 1,
    title: "리액트 스터디",
    description: "리액트 기초부터 실전까지",
    tags: ["#프론트엔드", "#리액트"],
  },
  {
    id: 2,
    title: "파이썬 데이터 분석",
    description: "데이터 분석 라이브러리 활용",
    tags: ["#백엔드", "#데이터"],
  },
  {
    id: 3,
    title: "토익 900+ 달성",
    description: "매일 꾸준한 영어 스터디",
    tags: ["#영어", "#토익"],
  },
];

const StudyList = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          최근 생성된 스터디
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((study) => (
            <div
              key={study.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {study.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {study.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyList;
