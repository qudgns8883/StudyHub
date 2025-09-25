import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStudyStore from "../stores/study";
import type { StudyState } from "../stores/study";

const StudyDetailPage = () => {
  const { studyId } = useParams<{ studyId: string }>();

  const study = useStudyStore((state: StudyState) => state.study);
  const fetchStudyById = useStudyStore(
    (state: StudyState) => state.fetchStudyById
  );

  useEffect(() => {
    if (studyId) {
      fetchStudyById(Number(studyId));
    }
  }, [studyId, fetchStudyById]);

  if (!study) {
    return null;
  }

  const tagList = study.tags
    ? study.tags.split(",").map((tag) => tag.trim())
    : [];

  return (
    <div className="container mx-auto px-4 py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4">{study.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {tagList.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-2">스터디 소개</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
              {study.description}
            </p>
          </div>
          <div className="md:col-span-1 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold mb-4">스터디 정보</h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                <span className="font-bold">최대 인원: </span>
                {study.currentParticipants} / {study.maxParticipants}명
              </li>
              <li>
                <span className="font-bold">시작일: </span>
                {study.startDate}
              </li>
              <li>
                <span className="font-bold">기간: </span>
                {study.duration}
              </li>
              <li>
                <span className="font-bold">개설자 ID: </span>
                {study.creatorId}
              </li>
            </ul>
            <button className="mt-6 w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700 transition duration-300">
              참여하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyDetailPage;
