import Post from "../Timeline/Post";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
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
      <div className="border-b border-gray-500 px-4 py-4 flex gap-4 items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <textarea
          name=""
          id=""
          className="w-full h-10 p-2 border-none outline-none bg-inherit resize-none flex items-center"
          placeholder="Post your Reply"
        ></textarea>
        <button className="px-3 py-1 border rounded-full border-gray-500 "> Reply </button>
      </div>
    </div>
  );
};

export default PostViewWithComments;
