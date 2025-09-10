import React from "react";
import StudyList from "../components/home/StudyList"; 
import CategorySection from "../components/home/CategorySection"; 
import RecentStudies from "../components/home/RecommendedStudies";

const Home = () => {
  return (
    <>
      <RecentStudies />
      <StudyList />
      <CategorySection />
    </>
  );
};

export default Home;
