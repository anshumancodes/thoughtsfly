import { Home, Search, Plus ,User,Settings} from "lucide-react";
import { Link } from "react-router-dom";
import { useSetRecoilState,useRecoilValue } from "recoil";
import { CreatePostModalState,LightOrDark} from "../../context/Atoms";

const MobileNav = () => {
  const setCreatePostModalState = useSetRecoilState(CreatePostModalState);
  const theme = useRecoilValue(LightOrDark);
  const user=localStorage.getItem("username")?.toString();
  return (
    <nav  className={`md:hidden fixed bottom-0 inset-x-0 border-t border-gray-500 ${theme === "light"
      ? "bg-[#FFFFFA] text-grey-900"
      : "bg-black text-[#FFFFFA]"}`}>
      <div className="flex justify-around items-center h-16 relative">
        <Link to={"/home"}>
        <button className="flex flex-col items-center">
          <Home className="w-6 h-6" />
        </button>
        </Link>
        
        <Link to={"/explore"}>
        <button className="flex flex-col items-center">
          <Search className="w-6 h-6" />
        </button>
</Link>
       {/* open tweet */}
        <button className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#e14f20]  rounded-full p-3 shadow-lg" onClick={() => setCreatePostModalState(true)}>
          <Plus className="w-4 h-4" />
        </button>
        <Link to={"/settings"}>        <button className="flex flex-col items-center">
          <Settings className="w-6 h-6" />
        </button>
</Link>
        <Link to={`/u/${user}`}>
        <button className="flex flex-col items-center">
          <User className="w-6 h-6" />
        </button></Link>
      </div>
    </nav>
  );
};

export default MobileNav;

