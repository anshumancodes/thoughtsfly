import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LightOrDark } from "./context/Atoms";
import ProductSignup from "./pages/ProductSignup";
import Home from "./pages/Home";
import UserProfile from "./components/UserProfile/UserProfile";
import AppLayout from "./Layouts/AppLayout";
import Explore from "./pages/Explore";
import PostViewWithComments from "./components/Comments/PostViewWithComments";
import { useAuth0 } from "@auth0/auth0-react";
import Settings from "./components/Settings/Settings";
import AccountSettings from "./components/Settings/AccountSettings";
import ChangePassword from "./components/Settings/ChangePassword";
import DeleteAccount from "./components/Settings/DeleteAccount";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import InvalidRoutePage from "./pages/InvalidRoutePage";
function App() {
  const theme = useRecoilValue(LightOrDark);
  const { user } = useAuth0();
  console.log(user);

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-[#FFFFFA] text-grey-900"
          : "bg-black text-[#FFFFFA]"
      }`}
    >
      <Routes>
        {/* Public Routes */}
        <Route path="*" element={<InvalidRoutePage />} />
        <Route path="/signup" element={<ProductSignup />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/post/:postId" element={<PostViewWithComments />} />
            <Route path="/settings" element={<Settings />}>
              <Route index element={<AccountSettings />} />
              <Route path="account" element={<AccountSettings />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="delete-account" element={<DeleteAccount />} />
            </Route>
          
          </Route>
        </Route>
       
      </Routes>
    </div>
  );
}



export default App;
