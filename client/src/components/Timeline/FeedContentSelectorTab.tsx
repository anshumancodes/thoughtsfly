import { ContentTabState } from "../../context/Atoms";
import { useRecoilState } from "recoil";

const FeedContentSelectorTab = () => {
  const [activeTab, setActiveTab] = useRecoilState(ContentTabState); // Correct use of Recoil state

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex border-b border-gray-300 mb-4 justify-center gap-12">
      <button
        className={`py-2 px-4 text-sm font-semibold ${
          activeTab === "for-you"
            ? "border-b-2 border-[#e14f20] text-[#e14f20]"
            : "text-gray-600"
        }`}
        onClick={() => handleTabClick("for-you")}
      >
        For You
      </button>
      <button
        className={`py-2 px-4 text-sm font-semibold ${
          activeTab === "following"
            ? "border-b-2 border-[#e14f20] text-[#e14f20]"
            : "text-gray-600"
        }`}
        onClick={() => handleTabClick("following")}
      >
        Following
      </button>
    </div>
  );
};

export default FeedContentSelectorTab;
