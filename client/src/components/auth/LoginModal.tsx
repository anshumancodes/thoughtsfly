
import { Github, X } from 'lucide-react';
import {useSetRecoilState} from "recoil";
import { loginModalState } from "../../context/Atoms.js";
const LoginModal = () => {
    const SetLoginModal=useSetRecoilState(loginModalState);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full">
      <div className="bg-white w-[560px] rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">Sign in to Your Account</h3>
          <button className="p-1 hover:bg-gray-100 rounded-full " onClick={()=>{SetLoginModal(false)}}>
            <X size={20} />
          </button>
        </div>

        {/* Buttons */}
        <div className="p-6">
          <button className="w-full bg-[#1e1e1e] border border-gray-300 text-gray-100 font-semibold py-2 rounded-full shadow-sm flex items-center justify-center gap-2 mb-4">
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button>
          <button className="w-full bg-[#1e1e1e] border border-gray-300 text-gray-100 font-semibold py-2 rounded-full shadow-sm flex items-center justify-center gap-2">
            <Github size={20} /> Sign up with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center px-6">
          <div className="border-t border-gray-300 w-full" />
          <span className="px-2 text-sm text-gray-500">or</span>
          <div className="border-t border-gray-300 w-full" />
        </div>

        {/* Form */}
        <div className="p-6">
          <form className="flex flex-col space-y-4">
            <div>
             
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>

            <div>
             
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>

            <button type="submit" className="w-full bg-[#e14f20] text-white font-semibold py-2 rounded-full hover:bg-blue-600 transition duration-300">
              Sign In
            </button>
          </form>
        </div>

       
        
      </div>
    </div>
  );
};

export default LoginModal;
