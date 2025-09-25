import apiClient from "./apiClient";
import type { NewStudy, Study, Tag } from "../types/studyType";

export default class studyService {
  static async createStudy(studyData: NewStudy): Promise<Study> {
    const response = await apiClient.post("/studies", studyData, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  }
  static async fetchStudies(): Promise<Study[]> {
    const response = await apiClient.get("/studies/recent");
    return response.data;
  }

  static async fetchStudyById(id: number): Promise<Study> {
    const response = await apiClient.get(`/studies/${id}`);
    return response.data;
  }

  static async fetchTags(): Promise<Tag[]> {
    const response = await apiClient.get("/getTags");
    return response.data;
  }
}
