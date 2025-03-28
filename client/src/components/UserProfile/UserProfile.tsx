import { ArrowLeft } from "lucide-react";
import TabNavigation from "./TabNavigation";
import Post from "../Timeline/Post";
import { Link } from "react-router-dom";
import { EditProfileModalState } from "../../context/Atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import EditProfileModal from "./EditProfileModal";

const UserProfile = () => {
  const setEditProfileModalState = useSetRecoilState(EditProfileModalState);
  const EditProfileModalVisibility = useRecoilValue(EditProfileModalState);

  return (
    <div className="max-w-screen-sm mx-auto  shadow-sm md:border-r border-gray-500 md:h-screen">
    
      <div className="flex  p-4 border-b flex-col">
        <div className="flex gap-2">
        <Link to="/home" className="mr-4">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">Anshuman Praharaj</h1>
        </div>
     
      <div className=" ml-8 px-4 pb-2">
        <p className="text-sm text-gray-500">110 posts</p>
      </div>
      </div>

      

      {/* Banner and Profile Picture */}
      <div className="relative">
        <img
          src="https://pbs.twimg.com/profile_banners/1600013306437455872/1705417291/1500x500"
          alt="Banner"
          className="w-full object-cover"
        />
        <img
          src="https://pbs.twimg.com/profile_images/1855841395329617920/764Jlajm_400x400.jpg"
          alt="Profile"
          className="absolute -bottom-10 left-4 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white"
        />
      </div>

      {/* User Details */}
      <div className="px-4 pt-12 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Anshuman Praharaj</h2>
            <p className="text-gray-500">@anshumancdx</p>
          </div>
          <button
            className="px-4 py-1 border rounded-full border-gray-500  flex items-center justify-center"
            onClick={() => setEditProfileModalState(true)}
          >
            Edit Profile
          </button>
        </div>
        {EditProfileModalVisibility && <EditProfileModal />}
        <div className="mt-4">
          <p className="text-sm">
            community @LearnToBuild_in • read my blogs:{" "}
            <a
              href="https://anshumancdx.hashnode.dev/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              anshumancdx.hashnode.dev
            </a>
          </p>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <p>
              <span className="font-semibold">107</span> following
            </p>
            <p>
              <span className="font-semibold">87</span> followers
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <TabNavigation />

      {/* User Posts */}
      <div className="border-t">
        <Post />
      </div>
    </div>
  );
};

export default UserProfile;

// data and figures are dummy meant for placeholder purpose only , the design is primitive and not final yet 