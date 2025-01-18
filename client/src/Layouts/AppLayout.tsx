import SideNav from '../components/Nav/SideNav'
import TrendingCard from '../components/Trending/TrendingCard'
import { ComponentInLayout } from '../context/Atoms'
import { useRecoilValue } from 'recoil'
const AppLayout = () => {
    const Component=useRecoilValue(ComponentInLayout)
  return (
    <main className="mx-auto flex gap-1 max-w-6xl px-4">
      <SideNav  /> 
      <div className='w-[800px] h-[100vh] overflow-y-auto border-r border-gray-500 hide-scrollbar flex justify-center'>
      <Component />
      </div>
      <div>
        <TrendingCard />
      </div>
    </main>
  )
}

export default AppLayout