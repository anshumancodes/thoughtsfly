import { X } from "lucide-react";
import { useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { CreatePostModalState, LightOrDark, UserProfileInfo } from "../../context/Atoms";

const CreatePostModal = () => {
  const theme = useRecoilValue(LightOrDark);
  const userProfile = useRecoilValue(UserProfileInfo);
  const setCreatePostModalState = useSetRecoilState(CreatePostModalState);

  const [content, setContent] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  const handleCreatePost = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await axios.post(
        "http://localhost:8001/api/v1/post/create",
        { content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post created:", response.data);
      setContent("");
     
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const themeClass =
    theme === "light"
      ? "bg-[#FFFFFA] text-gray-900"
      : "bg-[#1e1e1e] text-[#FFFFFA]";

  return (
    <div className="fixed top-0 left-0 w-screen h-full bg-[#1e1e1e] bg-opacity-50 z-40 flex justify-center">
      <div
        className={`${themeClass} px-4 py-4 w-[95%] md:w-[600px] h-[360px] rounded-[32px] shadow-md mt-20 z-50`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setCreatePostModalState(false)}>
            <X />
          </button>
          <button className="text-[#e14f20] font-bold px-2 py-1">Draft</button>
        </div>

        {/* User + Textarea */}
        <div className="flex gap-3 items-start mb-4">
          <img
            src={userProfile.avatar || "/default-avatar.png"}
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            maxLength={1000}
            className="w-full caret-gray-600 p-3 outline-none bg-inherit resize-none min-h-[180px] overflow-y-auto hide-scrollbar"
          />
        </div>

        <div className="h-[1px] bg-gray-500 w-full mb-4" />

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/img-box-svgrepo-com.svg" alt="Add image" width={24} height={24} />
            <img src="/gif-svgrepo-com.svg" alt="Add gif" width={24} height={24} />
          </div>
          <button
            onClick={handleCreatePost}
            className="bg-[#e14f20] text-white font-bold py-2 px-6 rounded-full hover:bg-[#e96c46]"
            disabled={!content.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;

