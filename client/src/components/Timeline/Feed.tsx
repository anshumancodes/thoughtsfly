import FeedPostInput from "./FeedPostInput";
import Post from "./Post";
import FeedContentSelectorTab from "./FeedContentSelectorTab";
const Feed = () => {
 
  return (
    <div className="overflow-y-auto max-h-[100vh]  px-4 pt-4 pb-0 w-[800px]  border-r border-b border-gray-500 hide-scrollbar ">
      <div className="flex flex-col h-full items-center">
      <FeedContentSelectorTab/>

        <FeedPostInput/>

        {/* Posts */}
        <div>
          <Post/>
          
        </div>
      </div>
    </div>
  );
};

export default Feed;
