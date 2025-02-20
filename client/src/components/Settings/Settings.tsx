import { ChevronRight, HeartCrack, KeyRoundIcon, Moon, Sun, ToggleLeftIcon, User } from "lucide-react";


const Settings = () => {
    
  return (
    <div className="w-[590px] flex flex-col">
      <div className=" px-2">
        <h1 className="text-2xl font-bold">Your Account</h1>
        <p className="text-sm text-gray-500 mt-3">
          See information about your account, or learn about your account
          deletation options
        </p>
      </div>
      <div className="flex-col flex space-y-6 px-2 mt-10">
        <div className="flex  gap-4 items-center">
          <div>
            <User />
          </div>
          <div>
            <p className="font-bold text-xl">Account information</p>
            <p className="flex gap-3 text-gray-500 mt-1">see your account information like your email , username etc. <ChevronRight/></p>
          </div>
        </div>
        <div className="flex  gap-4 items-center">
          <div>
            <KeyRoundIcon/>
          </div>
          <div>
            <p className="font-bold text-xl">Change Password</p>
            <p className="flex gap-3 text-gray-500 mt-1">see your account information like your email , username etc. <ChevronRight/></p>
          </div>
        </div>

        <div className="flex  gap-4 items-center">
          <div>
            <HeartCrack/>
          </div>
          <div>
            <p className="font-bold text-xl">Delete your account</p>
            <p className="flex gap-3 text-gray-500 mt-1">see your account information like your email , username etc. <ChevronRight/></p>
          </div>
        </div>

        <div className="flex  gap-4 items-center">
          <div>
           <ToggleLeftIcon/>
          </div>
          <div>
            <p className="font-bold text-xl">Set your theme</p>
           
           <div className="mt-2"><ThemeToggle/></div>
          </div>
        </div>

      </div>
    </div>
  );
};

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { LightOrDark } from "../../context/Atoms";


const ThemeToggle = () => {
  const [theme, setTheme] = useRecoilState(LightOrDark);

  // Sync theme changes to localStorage and document's classList
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

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
