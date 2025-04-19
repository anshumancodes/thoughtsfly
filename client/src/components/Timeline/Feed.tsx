import { useEffect, useState, useCallback } from "react";
import FeedPostInput from "./FeedPostInput";
import Post from "./Post";
import FeedContentSelectorTab from "./FeedContentSelectorTab";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Feed = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(String);  

  
  const fetchPosts = useCallback(async () => {
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

      // Handle the API response
      const { data } = response;
      if (data?.data?.posts) {
        setPosts(data.data.posts);
      } else {
        console.error("Unexpected response format:", data);
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Error fetching posts. Please try again later.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); // Only run the effect when fetchPosts changes

  return (
    <div className="overflow-y-auto max-h-[100vh] hide-scrollbar">
      <div className="flex flex-col items-center md:w-[540px]">
        <FeedContentSelectorTab />
        <FeedPostInput />

        {/* Display loading, posts, or error messages */}
        <div className="w-full">
          {loading ? (
            <div className="text-center py-4">Loading posts...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : posts.length > 0 ? (
            posts.map((data, index) => (
              <Post key={index} data={data} />
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
