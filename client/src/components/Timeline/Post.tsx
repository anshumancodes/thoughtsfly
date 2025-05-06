import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export interface PostOwner {
  _id: string;
  username: string;
  name: string;
  avatar: string;
}

export interface PostData {
  _id: string;
  content: string;
  owner: PostOwner;
  likes: string[];
  comments: any[];
  retweets: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostProps {
  data: PostData;
}

const Post = ({ data }: PostProps) => {
  const [UpVote, setUpVote] = useState(false);
  const [UpVoteCount, setUpVoteCount] = useState(data.likes.length);
  const { getAccessTokenSilently } = useAuth0();

  const HandleUpVote = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(
        "post id ",data._id
      )
      if (!UpVote) {
        await axios.post(
          "http://localhost:8001/api/v1/like/create",
          {
            postId: data._id?.toString(), 
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("✅ Like sent successfully!");
        setUpVote(true);
        setUpVoteCount((prev) => prev + 1);
      } else {
        // Optional: call an unlike endpoint here
        setUpVote(false);
        setUpVoteCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error while upvoting:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-inherit px-4 pt-4 border-b border-gray-500 w-full lg:w-[605px]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
            <img src={data.owner.avatar} alt="" className="rounded-full" />
          </div>
          <div>
            <div className="font-medium text-base">{data.owner.name}</div>
            <Link to={`/u/${data.owner.username}`}>
              <div className="text-base text-gray-500">@{data.owner.username}</div>
            </Link>
          </div>
        </div>

        <p className="mt-4 ml-2">{data.content}</p>

        <div className="flex p-2 mt-4 text-gray-500 justify-around items-center">
          <Link to={`/post/fetch/${data._id}`}>
            <img src="/message-circle-svgrepo-com.svg" alt="comments" width={20} />
          </Link>

          <img src="/repost-2-svgrepo-com.svg" alt="retweet" width={20} />

          <button
            onClick={HandleUpVote}
            className="flex items-center space-x-2 p-2 rounded-md"
          >
            <UpVoteArrow handler={HandleUpVote} upvoted={UpVote} />
            <p className="text-gray-500">{UpVoteCount}</p>
          </button>

          <img src="/stats-fm-svgrepo-com.svg" alt="stats" width={20} />
        </div>
      </div>
    </div>
  );
};

interface UpVoteArrowProps {
  handler: () => void;
  upvoted: boolean;
}

const UpVoteArrow = ({ handler, upvoted }: UpVoteArrowProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 511.947 511.947"
      fill={upvoted ? "#e14f20" : "#6b7280"}
      stroke={upvoted ? "#e14f20" : "#6b7280"}
      style={{ cursor: "pointer" }}
      onClick={handler}
    >
      <g id="SVGRepo_iconCarrier">
        <g>
          <path
            d="M476.847,216.373L263.513,3.04c-4.267-4.053-10.88-4.053-15.04,0L35.14,216.373c-4.16,4.16-4.16,10.88-0.107,15.04 
            c2.027,2.027,4.8,3.2,7.573,3.2h128V501.28c0,5.867,4.8,10.667,10.667,10.667h149.333c5.867,0,10.667-4.8,10.667-10.667V234.613 
            h128c5.867,0,10.667-4.8,10.667-10.667C479.94,221.067,478.873,218.4,476.847,216.373z M330.607,213.28 
            c-5.867,0-10.667,4.8-10.667,10.667v266.667h-128V223.947c0-5.867-4.8-10.667-10.667-10.667H68.42L255.94,25.547L443.567,213.28 
            H330.607z"
          />
        </g>
      </g>
    </svg>
  );
};

export default Post;

