import Post from "../Timeline/Post";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ReplyInput from "./ReplyInput";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { PostData } from "../Timeline/Post";
const PostViewWithComments = () => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  const { postId } = useParams();
  const [post, setPost] = useState<PostData | null>(null);

  const fetchPost = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        `http://localhost:8001/api/v1/post/fetch/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("userposts", response);
      setPost(response.data.data.post);
    } catch (error) {
      console.log("unable to fetch this post", error);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchPost();
    }
  }, [postId]);

  return (
    <div>
      <div className="flex gap-12 ml-4 items-center">
        <Link to={"/home"}>
          {" "}
          <ArrowLeft />
        </Link>
        <p className="text-xl font-bold">Post</p>
      </div>
      <div className="mt-5">
        {post ? (
          <Post data={post} />
        ) : (
          <p className="text-gray-500 text-sm px-4">Loading post...</p>
        )}
      </div>
      <div className="border-b border-gray-500 w-[605px]">
        <ReplyInput />
      </div>
      {/* comments trailing here  will be added later */}
    </div>
  );
};

export default PostViewWithComments;
