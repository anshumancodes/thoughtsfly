import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LightOrDark } from "./context/Atoms";
import ProductSignup from "./pages/ProductSignup";
import Home from "./pages/Home";
import UserProfile from "./components/UserProfile/UserProfile";
import AppLayout from "./Layouts/AppLayout";
import Explore from "./pages/Explore";
import PostViewWithComments from "./components/Comments/PostViewWithComments";

import Settings from "./components/Settings/Settings";
import AccountSettings from "./components/Settings/AccountSettings";
import ChangePassword from "./components/Settings/ChangePassword";
import DeleteAccount from "./components/Settings/DeleteAccount";

function App() {
  const theme = useRecoilValue(LightOrDark);

  // Toggle dark/light mode

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-[#FFFFFA] text-grey-900"
          : "bg-black text-[#FFFFFA]"
      }`}
    >
      <Routes>
        {/* Route for standalone pages */}
        <Route path="/" element={<ProductSignup />} />

        {/* Routes under AppLayout */}
        <Route path="/" element={<AppLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="user" element={<UserProfile />} />
          <Route path="explore" element={<Explore />} />
          <Route path="post/124" element={<PostViewWithComments />} />
          <Route path="/settings" element={<Settings />}>
            <Route path="account" element={<AccountSettings />} />
            <Route path="change-password" element={<ChangePassword/>}/>
            <Route path="delete-account" element={<DeleteAccount/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
