
import  { useState } from "react";
import FeedPostInput from "./FeedPostInput";
import Post from "./Post";
const Feed = () => {
  const [activeTab, setActiveTab] = useState("for-you");
  return (
    <div className="overflow-y-auto max-h-[100vh]  px-4 pt-4 pb-0 w-[800px]  border-r border-b border-gray-500">
      <div className="flex flex-col h-full">
        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-4 justify-center gap-12">
          <button
            className={`py-2 px-4 text-sm font-semibold ${
              activeTab === "for-you"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("for-you")}
          >
            For You
          </button>
          <button
            className={`py-2 px-4 text-sm font-semibold ${
              activeTab === "following"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
        </div>

        <FeedPostInput/>

        {/* Posts */}
        <div>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </div>
      </div>
    </div>
  );
};

export default Feed;
