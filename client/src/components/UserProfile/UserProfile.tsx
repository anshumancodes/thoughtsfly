import { ArrowLeft } from "lucide-react";
import TabNavigation from "./TabNavigation";
import Post from "../Timeline/Post";
import { Link } from "react-router-dom";
const UserProfile = () => {
  return (
    <div>
      <div className=" w-[600px]">
        <h1 className="text-3xl font-bold flex gap-2 items-center mb-1">
         <Link to={"/home"}> <ArrowLeft /></Link>
          Anshuman Praharaj
        </h1>
        <p className="ml-8 text-sm text-gray-500">110 posts</p> 
        {/* dummy data  */}
      </div>
      {/* Banner Container */}
      <div className="relative">
        <img
          src="https://pbs.twimg.com/profile_banners/1600013306437455872/1705417291/1500x500"
          alt="Banner"
          className="w-full h-48 object-cover"
        />
        {/* Profile Picture */}
        <img
          src="https://pbs.twimg.com/profile_images/1855841395329617920/764Jlajm_400x400.jpg"
          alt="Profile"
          width={140}
          className="absolute bottom-[-50px] left-10 rounded-full  z-10"
        />
      </div>

      <div className="flex w-full justify-between px-2 py-4 mt-5">
        <div className="flex flex-col justify-center w-[400px] p-4 rounded-lg shadow-md">
          <div>
            <h2 className="text-xl font-bold ">Anshuman Praharaj</h2>
            <p className="text-base text-gray-500">@anshumancdx</p>
          </div>

          <div className="mt-5">
            <p>
              community @LearnToBuild_in • read my blogs:{" "}
              <a href="https://anshumancdx.hashnode.dev/" className="text-blue-500">
                https://anshumancdx.hashnode.dev/
                {/* dummy link */}
              </a>
            </p>
            <div className="flex gap-2 mt-2">
              <p>
                107 <span className="text-gray-500">following</span>
              </p>
              <p>
                87 <span className="text-gray-500">followers</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <button className="px-3 outline-none py-1 border rounded-full border-gray-500 ">
            Edit Profile
          </button>
        </div>
      </div>
      <TabNavigation/>
      <div>
        <Post />
      </div>
    </div>
  );
};

export default UserProfile;

// data and figures are dummy meant for placeholder purpose only , the design is primitive and not final yet 

