import { useRecoilState } from "recoil";
import { activeTabState } from "../../context/Atoms";

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);

  const tabs = ["Posts", "Replies", "Media","Likes"]; 

  return (
    <div className="px-5 border-b border-gray-500">
      <div className="flex space-x-6 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-base ${
              activeTab === tab
                ? " border-b-2 border-[#e14f20]"
                : "hover:text-gray-400"
            } pb-1`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;

