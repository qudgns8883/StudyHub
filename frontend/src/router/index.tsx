import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import CreateStudy from "../pages/CreateStudy";
import StudyDetailPage from "../pages/StudyDetailPage";
import StudyFindPage from "../pages/StudyFinderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "createStudy", element: <CreateStudy /> },
      // { path: "studyDetailPage", element: <StudyDetailPage /> },
      { path: "/studies/:studyId", element: <StudyDetailPage /> },
      { path: "/studyFindPage", element: <StudyFindPage /> },
    ],
  },
]);

export default router;
