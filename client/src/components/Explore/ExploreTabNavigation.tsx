import { useRecoilState } from "recoil";
import {ExploreTabNavigationState } from "../../context/Atoms";
const ExploreTabNavigation = () => {
    const [activeTab, setActiveTab] = useRecoilState(ExploreTabNavigationState);

    const tabs = ["For You", "Trending", "Following","Entertainment"]; 
  
    return (
      <div className="bg-black text-gray-400 font-bold px-5  ">
        <div className="flex justify-around ">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-base ${
                activeTab === tab
                  ? "text-white border-b-2 border-[#e14f20]"
                  : "hover:text-gray-200"
              } pb-1`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    );
}

export default ExploreTabNavigation