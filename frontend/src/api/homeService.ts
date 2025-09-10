import axios from "axios";

export default class homeervice {
  // static BASE_URL = "/api";
  static BASE_URL = "http://localhost:8081";

  static async homeapi() {
    try {
      const response = await axios.get(`${this.BASE_URL}/hi`);

      return response;
    } catch (e) {
      console.error("메인페이지", e);
      return null;
    }
  }
}
