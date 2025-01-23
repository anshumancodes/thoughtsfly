import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="top-0 flex flex-col items-start h-screen p-4 space-y-8 border-r border-gray-500 w-64">
      {/* Logo Section */}
      <div className="flex items-center justify-center w-full py-4">
        <img src="/thoughts-fly-logos/160px.svg" alt="Logo" width={160} height={80} />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-6 w-full">
        <Link to="/home">
          <p className="text-xl font-semibold hover:bg-white hover:bg-opacity-10 p-2 rounded-[32px] cursor-pointer text-center">
            Home
          </p>
        </Link>
        <p className="text-xl font-semibold hover:bg-white hover:bg-opacity-10 p-2 rounded-[32px] cursor-pointer text-center">
          Explore
        </p>
        <p className="text-xl font-semibold hover:bg-white hover:bg-opacity-10 p-2 rounded-[32px] cursor-pointer text-center">
          #Hashtags
        </p>
        <Link to="/user">
          <p className="text-xl font-semibold hover:bg-white hover:bg-opacity-10 p-2 rounded-[32px] cursor-pointer text-center">
            Profile
          </p>
        </Link>
      </div>

      {/* Post Button */}
      <div className="mt-auto w-full">
        <button className="w-full bg-[#e14f20] text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600">
          Post
        </button>
      </div>
    </div>
  );
};

export default SideNav;
