import type { UserLogin, UserSignUp, User } from "./../types/userType";
import apiClient from "./apiClient";
import axios from "axios";

export default class userService {
  static BASE_URL = "http://localhost:8081";

  /* 회원가입 */
  static async signUp(userSignup: UserSignUp): Promise<User> {
    const response = await axios.post("/users/signup", userSignup);
    return response.data;
  }

  /* 로그인 */
  static async login(userLogin: UserLogin): Promise<User> {
    const response = await axios.post(`${this.BASE_URL}/login`, userLogin, {});
    const { access } = response.headers;
    localStorage.setItem("access", access);

    // 로그인 성공 후 내 프로필 가져오기
    return response.data;
  }

  /* 내 정보 가져오기 */
  static async getMyProfile(): Promise<User> {
    const response = await apiClient.get("/users");
    return response.data;
  }

  /* 액세스 토큰 재발급 */
  static async reissueAccessToken(): Promise<string | null> {
    try {
      const response = await apiClient.post(
        `${this.BASE_URL}/reissue`,
        {},
        { withCredentials: true }
      );
      const { access } = response.headers;
      return access;
    } catch (e) {
      console.error("토큰 재발급 실패:", e);
      return null;
    }
  }

  /* 로그아웃 */
  static async logout() {
    await axios.post(`${this.BASE_URL}/logout`, {}, { withCredentials: true });
    localStorage.removeItem("access");
  }
}
