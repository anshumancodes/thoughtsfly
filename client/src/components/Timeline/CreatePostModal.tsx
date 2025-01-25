import { X } from "lucide-react";
import { useState, useRef } from "react";
import { CreatePostModalState } from "../../context/Atoms";
import { useSetRecoilState } from "recoil";
const CreatePostModal = () => {
  const setCreatePostModalState = useSetRecoilState(CreatePostModalState);
  const [height, setHeight] = useState(180); // Initial height
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const HandlePostInputResizing = () => {
    const textarea = textareaRef.current;
    if (textarea && textarea.scrollHeight >= 141) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    } else {
      setHeight(140);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center mt-20">
      <div className="px-4 py-4 w-[600px] h-[360px] rounded-[32px] bg-[#1e1e1e] shadow-md mr-32 mt-20">
        <div className="flex justify-between items-center">
          <button onClick={()=>setCreatePostModalState(false)}>
            <X />
          </button>
          <button className="text-[#e14f20] font-bold px-2 py-1">Draft</button>
        </div>

        <div className="">
          <img
            src="https://pbs.twimg.com/profile_images/1855841395329617920/764Jlajm_400x400.jpg"
            alt="Profile"
            width={60}
            className="rounded-full"
          />
          <textarea
            ref={textareaRef}
            placeholder="What's happening?"
            className={` w-full p-3 outline-none bg-inherit resize-none  ${
              height < 400 ? "h-auto" : "overflow-auto"
            } max-h-[400px]`}
            style={{ height: `${height}px` }}
            onInput={HandlePostInputResizing}
          />
        </div>
         <div className="h-[1px] bg-gray-500 w-full"></div>
        <div className="flex justify-between items-center mt-4 ">
           <div className="flex items-center gap-4">
           <img src="/img-box-svgrepo-com.svg" alt="" width={24} height={24} />
           <img src="/gif-svgrepo-com.svg" alt="" width={24} height={24} />
           </div>
           <div>
             <button className="bg-[#e14f20] text-white font-bold py-2 px-6 rounded-full hover:bg-[#e96c46]">
               Post
               </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
