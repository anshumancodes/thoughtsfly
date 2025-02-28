import SideNav from '../components/Nav/SideNav';
import TrendingCard from '../components/Trending/TrendingCard';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isSettingson } from '../context/Atoms';
import MobileNav from '../components/Nav/MobileNav';

const AppLayout = () => {
  const settingTabState = useRecoilValue(isSettingson);

  return (
    <main className="mx-auto flex flex-col md:flex-row  max-w-6xl md:px-4">
    
      <div className="hidden md:block">
        <SideNav />
      </div>
     
      <div className="">
        <Outlet />
      </div>
     
      <div className="md:hidden">
        <MobileNav />
      </div>
     
      <div className="hidden lg:block">
        {settingTabState ? null : <TrendingCard />}
      </div>
    </main>
  );
};

export default AppLayout;
