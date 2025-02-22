import { Link } from "react-router-dom";
import {CreatePostModalState} from "../../context/Atoms";
import { useSetRecoilState} from "recoil";

import { Settings ,User ,Search ,Home ,Hash} from "lucide-react";
const SideNav = () => {
  const setCreatePostModalState = useSetRecoilState(CreatePostModalState);
 
  return (
    <div className="top-0 flex flex-col items-start h-screen p-4 space-y-8 border-r border-gray-500 w-64">
      {/* Logo Section */}
      <div className="flex items-center justify-center w-full py-4">
        <img src="/thoughts-fly-logos/160px.svg" alt="Logo" width={160} height={80} />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-6 w-full">
        <Link to="/home">
          <p className="text-xl font-semibold hover:bg-white hover:bg-opacity-10 py-2 px-6 rounded-[32px] cursor-pointer text-center items-center justify-between flex gap-3  ">
            <Home/> Home
          </p>
        </Link>
        <Link to={"/explore"}><p className="text-xl font-semibold hover:bg-white hover:bg-opacity-10 py-2 px-6 rounded-[32px] cursor-pointer text-center items-center justify-between flex gap-3  ">
         <Search/> Explore
        </p></Link>
        <Link to={"/trending"}>
        <p className="text-xl font-semibold hover:bg-white hover:bg-opacity-10 py-2 px-6 rounded-[32px] cursor-pointer text-center items-center justify-between flex gap-3  ">
         <Hash/> Hashtags
        </p></Link>
        <Link to="/user">
          <p className="text-xl font-semibold hover:bg-white hover:bg-opacity-10 py-2 px-6 rounded-[32px] cursor-pointer text-center items-center justify-between flex gap-3  ">
           <User/> Profile
          </p>
        </Link>
        <Link to="/settings" >
          <p className="text-xl font-semibold hover:bg-white hover:bg-opacity-10 py-2 px-6 rounded-[32px] cursor-pointer text-center items-center justify-between flex gap-3  ">
          <Settings/>Settings
          </p>
        </Link>
      </div>

      {/* Post Button */}
      <div className="mt-auto w-full">
        <button className="w-full bg-[#e14f20] text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600" onClick={()=>setCreatePostModalState(true)}>
          Post
        </button>
      </div>
    </div>
  );
};

export default SideNav;
