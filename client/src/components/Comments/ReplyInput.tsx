
import { useState, useRef } from "react";

const ReplyInput = () => {
  const [activatedInput, setActivatedInput] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  
  const HandlePostInputResizing = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Auto-resize textarea
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 400)}px`;

    // Update character count
    setCharCount(textarea.value.length);
  };

  const handleActivateInput = () => {
    setActivatedInput(true);
  };

  const handleBlur = () => {
    if (!textareaRef.current?.value.trim()) {
      setActivatedInput(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="flex items-start space-x-3  ">
        {/* Profile Picture */}
        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 "></div>
        
        <div className="flex-grow">
          <textarea
            ref={textareaRef}
            className="w-full p-2 text-lg border-none outline-none resize-none bg-inherit hide-scrollbar"
            placeholder="Post your reply"
            rows={1}
            onClick={handleActivateInput}
            onInput={HandlePostInputResizing}
            onBlur={handleBlur}
            // maxLength={500}
          />
          
          {activatedInput && (
            <div className="flex justify-between items-center mt-2  pt-2">
              <div className="flex space-x-4">
                <button className=" rounded-full p-2">
                  <img src="/img-box-svgrepo-com.svg" alt="Media" className="w-5 h-5" />
                </button>
                <button className=" rounded-full p-2">
                  <img src="/gif-svgrepo-com.svg" alt="GIF" className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                {charCount > 0 && (
                  <span className={`text-sm ${charCount > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                    {charCount}/500
                  </span>
                )}
                <button 
                  className={`px-4 py-2 rounded-full ${
                    charCount > 0 && charCount <= 500 
                    ? 'bg-[#e14f20] text-white'
                    : 'bg-inherit text-gray-500 cursor-not-allowed border-gray-500 border'
                  }`}
                  disabled={charCount === 0 || charCount > 500}
                >
                  Reply
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
     
    </div>
    
  );
};

export default ReplyInput;

