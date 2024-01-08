import React from "react";
import Banner from "./Banner";
import PostCard from "../blogs/PostCards";
import Category from "./Category";

const Home = () => {
  return (
    <div>
    <main className="mt-10">
      <Banner />

      <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mt-10 mb-10">
        {/* post cards */}
        <PostCard />

        {/* right sidebar */}
        <Category />
      </div>
    </main>
    </div>
  );
};

export default Home;
