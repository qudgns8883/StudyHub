import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import useDarkModeStore from "./stores/useDarkModeStore";
import useUserStore from "./stores/useUserStore";
import { useEffect } from "react";

function App() {
  const darkMode = useDarkModeStore((state) => state.darkMode);
   const getMyProfile = useUserStore((state) => state.getMyProfile);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      getMyProfile();
    }
  }, [getMyProfile]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header darkMode={darkMode} />
        <main className="flex-grow pt-20">
          <Outlet context={{ darkMode }} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
