import { useRecoilState} from "recoil";
import { UpVoteState, UpVoteCountState } from "../../context/Atoms";
import { Link } from "react-router-dom";

const Post = ({data}:any) => {
  const [UpVote, setUpVote] = useRecoilState(UpVoteState);
  const [UpVoteCount, setUpVoteCount] = useRecoilState(UpVoteCountState);
  
  

  const HandleUpVote = () => {
    if (!UpVote) {
      setUpVote(true);
      setUpVoteCount(UpVoteCount + 1); 
    } else {
      setUpVote(false); 
      setUpVoteCount(UpVoteCount - 1);
    }
  };
  return (
    <div className="w-full">
      <div className="bg-inherit px-4 pt-4  border-b border-gray-500 w-full lg:w-[605px]">
        <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <div className="font-semibold text-base">{data.Name}</div>
            <div className="text-base text-gray-500">{data.username}</div>
          </div>
        </div>
        <p className="mt-4 ml-2 ">{data.content}</p>
        <div className="flex p-2 mt-4 text-gray-500 justify-around items-center">
         <Link to={`/post/124`}> <img src="/message-circle-svgrepo-com.svg" alt="" width={20} /></Link>
          <img src="/repost-2-svgrepo-com.svg" alt="" width={20} />


          <button
            onClick={HandleUpVote}
            className="flex items-center space-x-2 p-2 rounded-md"
          >
            <UpVoteArrow/>
            <p className="text-gray-500">{data.likes}</p>
          </button>


          <img src="/stats-fm-svgrepo-com.svg" alt="" width={20} />
        </div>
      </div>
    </div>
  );
};

const UpVoteArrow = () => {
  const [UpVote, setUpVote] = useRecoilState(UpVoteState); // Subscribe to atom state

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 511.947 511.947" // Adjusted to match the provided SVG
      fill={UpVote ? "#e14f20" : "#6b7280"} // Dynamic fill
      stroke={UpVote ? "#e14f20" : "#6b7280"} // Dynamic stroke
      style={{
        cursor: "pointer", // Optional: interactive cursor
      }}
      onClick={() => setUpVote(!UpVote)} // Toggle state on click
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
