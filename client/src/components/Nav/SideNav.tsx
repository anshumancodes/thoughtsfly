import { Link } from "react-router-dom";
import { CreatePostModalState } from "../../context/Atoms";
import { useSetRecoilState} from "recoil";
import LogoutModal from "../auth/LogoutModal";
import { Settings, User, Search, Home, Hash } from "lucide-react";


const SideNav = () => {
  const setCreatePostModalState = useSetRecoilState(CreatePostModalState);

 
  const user=localStorage.getItem("username")?.toString();
  console.log(user)
  const links = [
    { icon: <Home />, link: "/home", text: "Home" },
    { icon: <Search />, link: "/explore", text: "Explore" },
    { icon: <Hash />, link: "/trending", text: "Hashtags" },
    { icon: <User />, link: `/u/${user}`, text: "Profile" },
    { icon: <Settings />, link: "/settings", text: "Settings" },
  ];

  return (
    <div className="top-0 hidden md:flex flex-col items-start h-screen p-4 space-y-8 border-r border-gray-500 w-64 ">
    
      <div className="flex items-center justify-center w-full py-4">
        <img src="/thoughts-fly-logos/160px.svg" alt="Logo" width={160} height={80} />
      </div>

     
      <div className="flex flex-col space-y-4 w-full">
        {links.map(({ icon, link, text }) => (
          <Link to={link} key={text}>
            <p className="text-xl font-semibold hover:bg-white hover:bg-opacity-10 py-2 px-6 rounded-[32px] cursor-pointer text-center items-center justify-between flex gap-3">
              {icon} {text}
            </p>
          </Link>
        ))}
      </div>

     
      <div className="mt-auto w-full">
        <button
          className="w-full bg-[#e14f20] text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600"
          onClick={() => setCreatePostModalState(true)}
        >
          Post
        </button>
      </div>

    
      <div>
        <LogoutModal />
      </div>
    </div>
  );
};

export default SideNav;