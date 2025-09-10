// Banner.tsx
import React, { useState, useEffect } from "react";
import homeervice from "../../api/homeService";

const Banner = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await homeervice.homeapi();

        if (response && response.data) {
          setMessage(response.data);
        } else {
          setMessage("서버 응답이 없습니다.");
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        setMessage("서버에 연결할 수 없습니다.");
      }
    };

    fetchWelcomeMessage();
  }, []);

  return (
    <div className="fixed w-full top-20 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {message || "로딩 중..."}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            스터디가 필요하세요?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
