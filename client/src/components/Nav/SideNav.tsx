const SideNav = () => {
    return (
      <div className=" top-0  flex flex-col items-start  h-screen p-4 space-y-8 border-r border-gray-200 w-64">
        {/* Logo Section */}
        <div className="flex items-center justify-center w-full py-4">
          <img src="/thoughts-fly-logos/80px.svg" alt="Logo" width={48} height={48} />
        </div>
  
        {/* Navigation Links */}
        <div className="flex flex-col space-y-6 w-full">
          <p className="text-xl font-semibold hover:bg-gray-100 p-2 rounded-lg cursor-pointer">Home</p>
          <p className="text-xl font-semibold hover:bg-gray-100 p-2 rounded-lg cursor-pointer">Explore</p>
          <p className="text-xl font-semibold hover:bg-gray-100 p-2 rounded-lg cursor-pointer">#Hashtags</p>
          <p className="text-xl font-semibold hover:bg-gray-100 p-2 rounded-lg cursor-pointer">Profile</p>
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
  