import { useRecoilState } from "recoil";
import { activeTabState } from "../../context/Atoms";

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);

  const tabs = ["Posts", "Replies", "Media","Likes"]; 

  return (
    <div className="bg-black text-gray-400  px-5 border-b border-gray-500">
      <div className="flex space-x-6 ">
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
};

export default TabNavigation;

