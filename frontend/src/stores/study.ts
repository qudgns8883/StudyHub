import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Study, NewStudy, Tag } from "../types/studyType";
import type { User } from "../types/userType";
import studyService from "../api/studyService";

/**
 * 스터디 관련 상태를 정의하는 인터페이스입니다.
 */
export interface StudyState {
  user: User | null;
  study: Study | null;
  studies: Study[];
  tags: Tag[];

  /**
   * 새로운 스터디를 생성하는 비동기 함수입니다.
   * @param studyData - 'id'가 없는 새로운 스터디 데이터
   */
  createStudy: (studyData: NewStudy) => Promise<void>;

  /**
   * 모든 스터디 목록을 불러오는 비동기 함수입니다.
   */
  fetchStudies: () => Promise<void>;

  /**
   *  스터디 상세보기 불러오는 비동기 함수입니다.
   */
  fetchStudyById: (id: number) => Promise<void>;

  /**
   * 모든 스터디 태그를 불러오는 비동기 함수입니다.
   */
  fetchTags: () => Promise<void>;
}

const useStudyStore = create<StudyState>()(
  devtools((set) => ({
    // 초기 상태 값
    user: null,
    study: null,
    studies: [],
    tags: [],

    // 스터디 생성 함수
    createStudy: async (studyData: Study) => {
      try {
        console.log("Zustand 스토어에서 스터디 생성 요청:", studyData);

        const createdStudy = await studyService.createStudy(studyData);

        set({ study: createdStudy });
        console.log("새로운 스터디가 성공적으로 생성되었습니다:", createdStudy);
      } catch (error) {
        console.error("스터디 생성 중 오류가 발생했습니다:", error);
      }
    },

    // 모든 스터디 목록을 불러오는 함수
    fetchStudies: async () => {
      try {
        const allStudies = await studyService.fetchStudies();
        set({ studies: allStudies });
        console.log("스터디 목록을 성공적으로 불러왔습니다:", allStudies);
      } catch (error) {
        console.error("스터디 목록을 불러오는 중 오류가 발생했습니다:", error);
      }
    },

    // 특정 스터디 정보를 불러오는 함수
    fetchStudyById: async (id) => {
      try {
        const studyData = await studyService.fetchStudyById(id);
        set({ study: studyData });
        console.log(
          `ID ${id} 스터디 정보를 성공적으로 불러왔습니다.`,
          studyData
        );
      } catch (error) {
        console.error(
          `ID ${id} 스터디 정보를 불러오는 중 오류가 발생했습니다.`,
          error
        );
      }
    },

    fetchTags: async () => {
      try {
        const allTags = await studyService.fetchTags();
        set({ tags: allTags });
        console.log("태그 목록을 성공적으로 불러왔습니다:", allTags);
      } catch (error) {
        console.error("태그 목록을 불러오는 중 오류가 발생했습니다:", error);
      }
    },
  }))
);

export default useStudyStore;
