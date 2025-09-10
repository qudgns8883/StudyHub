import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import useDarkModeStore from "./stores/useDarkModeStore";

function App() {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header darkMode={darkMode} />
        <main className="flex-grow pt-20">
          {" "}
          {/* 헤더 높이만큼 상단 패딩 추가 */}
          <Outlet context={{ darkMode }} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
