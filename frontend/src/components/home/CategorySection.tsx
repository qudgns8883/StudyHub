import React from "react";

const categories = [
  { name: "개발", icon: "💻" },
  { name: "어학", icon: "🗣️" },
  { name: "자격증", icon: "📜" },
  { name: "취업", icon: "💼" },
  { name: "독서", icon: "📚" },
  { name: "기타", icon: "✨" },
];

const CategorySection = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-3">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-5">
          카테고리별 스터디 찾기
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
