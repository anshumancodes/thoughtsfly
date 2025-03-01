import { X } from "lucide-react";
import {useRef } from "react";
import { CreatePostModalState } from "../../context/Atoms";
import { useSetRecoilState,useRecoilValue } from "recoil";

import { LightOrDark } from "../../context/Atoms";
const CreatePostModal = () => {
  const theme = useRecoilValue(LightOrDark);
  
  const setCreatePostModalState = useSetRecoilState(CreatePostModalState);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

 
  return (
    <div className="fixed top-0 left-0 w-screen h-full bg-[#1e1e1e] bg-opacity-50 z-40 flex justify-center ">
      <div  className={`${
        theme === "light"
          ? "bg-[#FFFFFA] text-grey-900"
          : "bg-[#1e1e1e]  text-[#FFFFFA]"
      }px-2 md:px-4 md:py-4 w-[99%]  md:w-[600px] h-[360px] rounded-[32px]  shadow-md md:mr-32 mt-20 z-50`}>
        <div className="flex justify-between items-center p-2 md:p-0">
          <button onClick={()=>setCreatePostModalState(false)} >
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
            maxLength={1000}
            className={` w-full p-3 outline-none bg-inherit resize-none min-h-[180px] overflow-y-auto hide-scrollbar [&:valid]:caret-white [&:invalid]:caret-red-600`}
            
          />
        </div>
         <div className="h-[1px] bg-gray-500 w-full"></div>
        <div className="flex justify-between items-center mt-4 px-2 md:px-1">
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
