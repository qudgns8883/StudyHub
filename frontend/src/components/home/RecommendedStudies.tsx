import React from "react";

// 추천 스터디 데이터
const recommendedStudies = [
  {
    id: 1,
    title: "Kotlin 안드로이드 앱 개발",
    description: "코틀린을 활용한 안드로이드 앱 개발 실전",
    tags: ["#모바일", "#안드로이드", "#코틀린"],
  },
  {
    id: 2,
    title: "UX 리서치 심화 과정",
    description: "사용자 경험을 깊이 이해하는 리서치 방법론",
    tags: ["#UX", "#리서치", "#디자인"],
  },
  {
    id: 3,
    title: "사이드 프로젝트로 배우는 TypeScript",
    description: "작은 프로젝트를 만들며 배우는 타입스크립트",
    tags: ["#프로그래밍", "#타입스크립트", "#개발"],
  },
];

const RecommendedStudies = () => {
  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          추천 스터디
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedStudies.map((study) => (
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
                    className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
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

export default RecommendedStudies;
