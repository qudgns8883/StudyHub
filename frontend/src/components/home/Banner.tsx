import React, { useState, useEffect } from "react";
import axios from "axios";

const Banner = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await axios.get("http://localhost:8081/hi");
        setMessage(response.data);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        setMessage("서버에 연결할 수 없습니다.");
      }
    };

    fetchWelcomeMessage();
  }, []); 

  return (
    <div className="banner-section">
      <div className="banner-container">
        <div className="banner-text-center">
          <h1 className="banner-title">{message || "로딩 중..."}</h1>
          <p className="banner-subtitle">필요할 때 부르세요</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
