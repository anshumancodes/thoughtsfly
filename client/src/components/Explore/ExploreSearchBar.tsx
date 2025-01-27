import { Search } from "lucide-react"

const ExploreSearchBar = () => {
  return (
    <div className="border-gray-500 border rounded-[32px] flex text-base items-center px-4 text-gray-200 mt-2"><Search/><input type="text" className="w-[520px] py-2 h-12   outline-none bg-transparent px-1 text-gray-200 " placeholder="Try searching for people, hashtags, or keywords"></input></div>
  )
}

export default ExploreSearchBar