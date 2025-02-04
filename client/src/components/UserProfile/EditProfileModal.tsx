import { Camera,  X } from "lucide-react";
import { EditProfileModalState } from "../../context/Atoms";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
const EditProfile = () => {
  
  const setEditProfileModalState = useSetRecoilState(EditProfileModalState);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center">
      <div className=" bg-[#1e1e1e] w-[600px] h-[700px] rounded-[24px] mt-48 mr-32 overflow-y-scroll">
        <div className="flex justify-between items-center w-full p-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setEditProfileModalState(false)}>
              <X className="text-gray-500" />
            </button>
            <h2 className="text-[#e2e2e2] font-bold text-xl">Edit Profile</h2>
          </div>

          <div>
            <button className="bg-[#4b4949] px-3 py-1 rounded-full">
              Save
            </button>
          </div>
        </div>

        <div>
          <div className="relative w-full h-48 bg-[url('https://pbs.twimg.com/profile_banners/1600013306437455872/1705417291/600x200')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative h-full flex justify-center items-center w-full">
              <div className="flex space-x-14 items-center z-50">
                {/* Camera Icon with Tooltip */}
                <Tooltip text="Add photo">
                  <Camera
                    className="text-white font-bold rounded-full p-2 bg-white/20 cursor-pointer"
                    size={36}
                  />
                </Tooltip>

                {/* X Icon with Tooltip */}
                <Tooltip text="Remove Photo">
                  <X
                    className="text-white font-bold rounded-full p-2 bg-white/20 cursor-pointer"
                    size={36}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[140px]">
          <div className="bg-[url('https://pbs.twimg.com/profile_images/1855841395329617920/764Jlajm_400x400.jpg')] bg-cover bg-center w-[140px] h-[140px] rounded-full  flex justify-center items-center z-10 fixed mt-[-80px] ml-8 ">
          <Tooltip text="Add photo">
                  <Camera
                    className="text-black font-bold rounded-full p-2 bg-white/80 cursor-pointer"
                    size={36}
                  />
                </Tooltip>
          </div>
        </div>

        <div>
          <form action="" className="px-4 space-y-6 mb-5">

            <div className="border-[#6e6c6c] border flex flex-col px-2 rounded-md">
              <label htmlFor="name" className="text-gray-500 text-sm ">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-inherit outline-none border-none py-1"/>
            </div>
            <div className="border-[#6e6c6c] border flex flex-col px-2 rounded-md">
              <label htmlFor="name" className="text-gray-500 text-sm ">
                Bio
              </label>
              <textarea className="bg-inherit outline-none border-none py-1 resize-none h-[100px]" maxLength={130}/>
            </div>
            <div className="border-[#6e6c6c] border flex flex-col px-2 rounded-md">
              <label htmlFor="name" className="text-gray-500 text-sm ">
               Location
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-inherit outline-none border-none py-1"/>
            </div>
            <div className="border-[#6e6c6c] border flex flex-col px-2 rounded-md">
              <label htmlFor="name" className="text-gray-500 text-sm ">
                website
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-inherit outline-none border-none py-1"/>
            </div>

          </form>
        
        </div>
      </div>
    </div>
  );
};
function Tooltip({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {/* Tooltip Box */}
      {hover && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 shadow-md transition-opacity opacity-100 w-[120px] rounded-md text-center">
        <p className="w-full">{text}</p>
      </div>
      
      )}
    </div>
  );
}
export default EditProfile;
