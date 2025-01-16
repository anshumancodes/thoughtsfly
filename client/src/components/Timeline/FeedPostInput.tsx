import { Upload } from "lucide-react";
import { useState, useRef } from "react";

const FeedPostInput = () => {
  const [height, setHeight] = useState(140); // Initial height
  const textareaRef = useRef(null);
  
 

  const HandlePostInputResizing=()=>{
    const textarea = textareaRef.current;
    if (textarea && textarea.scrollHeight >= 141) {
      textarea.style.height="auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      // setHeight(textarea.scrollHeight);
    }
    else{
      setHeight(140);
    }
  }

  
  
  
  return (
    <div>
     
      <div className={`mb-4 border border-gray-500 h-auto`}>
      <textarea
      ref={textareaRef}
      placeholder="What's happening?"
      className={` w-full p-3 outline-none bg-inherit resize-none  ${height < 400 ? 'h-auto' : 'overflow-auto'} max-h-[400px]`}


      style={{ height: `${height}px` }}
      onInput={HandlePostInputResizing}
    />
        <div className="w-full flex justify-center">
          
          <div className="h-[1px] bg-gray-500 mb-1 w-full"></div>
        </div>
        <div className="flex w-full items-center justify-between pb-4 pr-4 pl-4 space-x-4">
          <div className="flex items-center space-x-4">
            <Upload />
            <img src="/gif-svgrepo-com.svg" alt="GIF Icon" width={24} height={24} />
          </div>
          <button className="bg-[#e14f20] text-white font-bold py-2 px-6 rounded-full hover:bg-[#e96c46]">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedPostInput;

