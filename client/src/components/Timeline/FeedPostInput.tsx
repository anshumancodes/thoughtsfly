import {useState} from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
const FeedPostInput = () => {
  
  const [content,setContent]=useState('')
  const {getAccessTokenSilently}=useAuth0()
  
  const handleCreatePost = async () => {
   
    try {
      const token = await getAccessTokenSilently(); 
      console.log
      const response = await axios.post(
        `http://localhost:8001/api/v1/post/create`,
        { content },
        
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log("response on client", response.data);
      setContent("")
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return (
    <div className=" w-full">
      <div className="border-y border-gray-500 w-full min-w-[375px] max-w-[605px] mx-auto">
        <textarea
         
          placeholder="What's happening?"
          maxLength={1000}
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full p-3 outline-none bg-inherit resize-none hide-scrollbar min-h-[140px]`}
         
        />
        <div className="w-full flex justify-center">
          <div className="h-[1px] bg-gray-500 mb-1 w-full"></div>
        </div>
        <div className="flex items-center justify-between p-2 space-x-4">
          <div className="flex items-center space-x-4">
            <img
              src="/img-box-svgrepo-com.svg"
              alt="Image Icon"
              width={24}
              height={24}
            />
            <img
              src="/gif-svgrepo-com.svg"
              alt="GIF Icon"
              width={24}
              height={24}
            />
          </div>
          <button className="bg-[#e14f20] text-white font-bold py-2 px-6 rounded-full hover:bg-[#e96c46]" onClick={handleCreatePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedPostInput;


