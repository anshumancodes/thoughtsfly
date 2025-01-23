import SideNav from '../components/Nav/SideNav'
import TrendingCard from '../components/Trending/TrendingCard'
import { Outlet } from 'react-router-dom'
const AppLayout = () => {
    
  return (
    <main className="mx-auto flex gap-1 max-w-6xl px-4">
      <SideNav  /> 
      <div className='w-[800px] h-[100vh] overflow-y-auto border-r border-gray-500 hide-scrollbar flex justify-center'>
      <Outlet />
      </div>
      <div>
        <TrendingCard />
      </div>
    </main>
  )
}

export default AppLayout