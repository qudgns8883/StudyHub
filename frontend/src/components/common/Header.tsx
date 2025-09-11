import React from "react";
import { Link } from "react-router-dom";
import icons from "../../assets/icons";
import useDarkModeStore from "../../stores/useDarkModeStore";
import { LightModeIcon, DarkModeIcon } from "../../assets/svg/SvgIcons";
import useUserStore from "../../stores/useUserStore";

const Header: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);
  
  // 필요한 상태를 가져옵니다.
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const isLoading = useUserStore((state) => state.isLoading); 

  return (
    <header className="fixed w-full top-0 bg-white dark:bg-gray-800 shadow-md z-10">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-6">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={icons.MainHome}
              className="h-8 w-8 object-contain rounded-md"
              alt="StudyHub Logo"
            />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              StudyHub
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/study/search"
              className="text-gray-900 dark:text-white hover:text-blue-600 transition-colors duration-200"
            >
              스터디 찾기
            </Link>
            <Link
              to="/CreateStudy"
              className="text-gray-900 dark:text-white hover:text-blue-600 transition-colors duration-200"
            >
              스터디 생성
            </Link>
          </nav>
        </div>
        <nav className="flex items-center space-x-6">
          {/* 로딩 상태에 따라 UI를 분기합니다. */}
          {isLoading ? (
            // 로딩 중일 때: 스피너 또는 로딩 메시지 표시
            <span className="text-gray-900 dark:text-white">로딩 중...</span>
          ) : user ? (
            // 로그인 상태일 때: 닉네임과 로그아웃 버튼 표시
            <>
              <span className="text-gray-900 dark:text-white font-semibold">
                {user.nickname}님
              </span>
              <button
                onClick={logout}
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                로그아웃
              </button>
            </>
          ) : (
            // 로그아웃 상태일 때: 회원가입과 로그인 링크 표시
            <>
              <Link
                to="/signup"
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                회원가입
              </Link>
              <Link
                to="/login"
                className="text-gray-900 dark:text-white hover:text-blue-600"
              >
                로그인
              </Link>
            </>
          )}

          <div className="flex flex-col justify-center border-2 rounded-[50%]">
            <input
              type="checkbox"
              id="light-switch"
              name="light-switch"
              className="light-switch sr-only"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <label
              className="relative cursor-pointer p-2"
              htmlFor="light-switch"
            >
              <LightModeIcon className={`${darkMode ? "hidden" : "block"}`} />
              <DarkModeIcon className={`${darkMode ? "block" : "hidden"}`} />
              <span className="sr-only">Switch to light / dark version</span>
            </label>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;