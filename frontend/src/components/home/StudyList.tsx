import React, { useEffect } from "react";
import useStudyStore from "../../stores/study";
import { Link } from "react-router-dom"; 

const StudyList = () => {
  const studies = useStudyStore((state) => state.studies);
  const fetchStudies = useStudyStore((state) => state.fetchStudies);

  useEffect(() => {
    fetchStudies();
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          최근 생성된 스터디
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(studies) && studies.length > 0 ? (
            studies.map((study) => (
              <Link key={study.id} to={`/studies/${study.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 cursor-pointer">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {study.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(study.tags?.split(",") ?? []).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center col-span-full py-10 text-gray-500">
              아직 생성된 스터디가 없습니다.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StudyList;
