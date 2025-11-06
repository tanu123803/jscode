import React from "react";
import Section1 from "./section1";
import Body from "./body";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* What's on your mind carousel */}
      <Section1 />
      
      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-gray-300 my-6 sm:my-8" />
      </div>
      
      {/* Restaurant listing */}
      <Body />
    </div>
  );
};

export default Home;
