import { ChevronRight, HeartCrack, KeyRoundIcon, Moon, Sun, ToggleLeftIcon, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom'
import { useState } from "react";
const Settings = () => {
    const [anySettingOpend,SetAnySettingOpened]=useState(false)
  return (
    <div className="w-[590px] flex flex-col">
    
      
      <div className=" px-2">

        <h1 className="text-2xl font-bold">Your Account</h1>
        <p className="text-sm text-gray-500 mt-3">
          See information about your account, or learn about your account
          deletation options
        </p>
      </div>
     
      {anySettingOpend ? ( <div className="px-2 mt-2">
      <Outlet/>
      </div>) :(<div className="flex-col flex space-y-6 px-2 mt-10">
        <div className="flex  gap-4 items-center">
          <div>
            <User />
          </div>
          <Link to={"account"} onClick={()=>{SetAnySettingOpened(true)}}>
          <div>
            <p className="font-bold text-xl">Account information</p>
            <p className="flex gap-3 text-gray-500 mt-1">see your account information like your email , username etc. <ChevronRight/></p>
          </div></Link>
        </div>
       <Link to="change-password" onClick={()=>{SetAnySettingOpened(true)}}> <div className="flex  gap-4 items-center">
          <div>
            <KeyRoundIcon/>
          </div>
          <div>
            <p className="font-bold text-xl">Change Password</p>
            <p className="flex gap-3 text-gray-500 mt-1">see your account information like your email , username etc. <ChevronRight/></p>
          </div>
        </div></Link>

     <Link to={"delete-account"} onClick={()=>{SetAnySettingOpened(true)}}>
     <div className="flex  gap-4 items-center">
          <div>
            <HeartCrack/>
          </div>
          <div>
            <p className="font-bold text-xl">Delete your account</p>
            <p className="flex gap-3 text-gray-500 mt-1">see your account information like your email , username etc. <ChevronRight/></p>
          </div>
        </div>
     
     </Link>

        <div className="flex  gap-4 items-center">
          <div>
           <ToggleLeftIcon/>
          </div>
          <div>
            <p className="font-bold text-xl">Set your theme</p>
           
           <div className="mt-2"><ThemeToggle/></div>
          </div>
        </div>
       
      </div>)}
     
    </div>
  );
};


import { useRecoilState } from "recoil";
import { LightOrDark } from "../../context/Atoms";



const ThemeToggle = () => {
  const [theme, setTheme] = useRecoilState(LightOrDark);

  

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center w-16 h-8 rounded-full p-1 transition-all duration-300 ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
          theme === "dark" ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? (
          <Moon className="text-gray-800 w-5 h-5 m-0.5" />
        ) : (
          <Sun className="text-yellow-500 w-5 h-5 m-0.5" />
        )}
      </div>
    </button>
  );
};




export default Settings;
