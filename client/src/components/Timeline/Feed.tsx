import { useEffect, useState } from "react";
import FeedPostInput from "./FeedPostInput";
import Post from "./Post";
import FeedContentSelectorTab from "./FeedContentSelectorTab";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Feed = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchposts = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        "http://localhost:8001/api/v1/post/fetchFeed",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      
      // Extracting posts from ApiResponse structure
      if (response.data && response.data.data && response.data.data.posts) {
        setPosts(response.data.data.posts);
      } else {
        console.error("Unexpected response format:", response.data);
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchposts();
  }, []);

  return (
    <div className="overflow-y-auto max-h-[100vh] hide-scrollbar">
      <div className="flex flex-col items-center w-[540px]">
        <FeedContentSelectorTab />
        <FeedPostInput />

        {/* Posts */}
        <div className="w-full">
          {loading ? (
            <div className="text-center py-4">Loading posts...</div>
          ) : posts.length > 0 ? (
            posts.map((data, index) => (
              <Post key={ index} data={data} />
            ))
          ) : (
            <div className="text-center py-4">No posts to display</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;