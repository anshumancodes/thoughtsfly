import ExploreSearchBar from "../components/Explore/ExploreSearchBar";
import ExploreTabNavigation from "../components/Explore/ExploreTabNavigation";
const Explore = () => {
  return (
    <div className="py-3 ">
        <div className="flex flex-col w-full gap-6 sticky bg-black opacity-55 z-50">
            <ExploreSearchBar />
            <ExploreTabNavigation />
        </div>
    </div>
  )
}

export default Explore