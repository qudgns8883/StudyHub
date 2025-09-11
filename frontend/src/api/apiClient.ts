import axios from "axios";
import userService from "./userService";

const api = axios.create({
  baseURL: "http://localhost:8081",
});

// 요청 시 항상 access token 헤더 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401이면 refresh 후 재시도
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await userService.reissueAccessToken();
        if (newToken) {
          localStorage.setItem("access", newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (e) {
        console.error("토큰 갱신 실패:", e);
        localStorage.removeItem("access");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
