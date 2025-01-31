import Post from "../Timeline/Post";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ReplyInput from "./ReplyInput";
const PostViewWithComments = () => {
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
        <Post />  {/* Post component with content grab the data from the backend with reference to the post id, this is just template reference now */}
      </div>
      <div className="border-b border-gray-500 w-[605px]">
        <ReplyInput/>
      </div>
      {/* comments trailing here  will be added later */}
    </div>
  );
};

export default PostViewWithComments;
