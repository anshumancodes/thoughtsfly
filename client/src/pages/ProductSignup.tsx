import { Github } from "lucide-react";
import LoginModal from "../components/auth/LoginModal";
import {useSetRecoilState,useRecoilValue} from "recoil";
import { loginModalState } from "../context/Atoms.js";
import { useAuth0 } from "@auth0/auth0-react";
const ProductSignup = () => {
 const SetLoginModal=useSetRecoilState(loginModalState);
 const loginModal=useRecoilValue(loginModalState);
 const {loginWithPopup}=useAuth0();
  return (
    <section className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-20 w-full justify-center items-center h-screen p-6 ">
      {
        loginModal&& (<LoginModal/>)

      }
      {/* Left Image Section */}
      <div className="hidden md:flex justify-center items-center">
        <img
          src="/thoughts-fly-logos/360px.svg"
          alt="Thoughts Fly Logo"
          className="w-[300px] lg:w-[360px]"
        />
      </div>

      {/* Right Signup Section */}
      <div className="flex flex-col items-center w-full max-w-lg space-y-6 pb-10 md:pb-0">
        
        {/* Brand Section */}
        <div className="mt-10 flex flex-col items-center space-y-6 justify-center w-fit">
          <div className="flex items-center space-x-4">
            <img
              src="/signup-doodles/Group 8.png"
              alt="Doodles"
              className="hidden w-16 h-16"
            />
            <h1 className="text-6xl font-bold text-[#333] text-center md:leading-snug mt-20 md:mt-0">
              Welcome to <span className="text-[#E14f20]">thoughtsfly</span>
            </h1>
          </div>
          <div>
            <img
              src="/signup-doodles/Group 7.png"
              alt="Doodles"
              className="w-[300px] md:w-[500px] lg:w-[600px]"
            />
          </div>
        </div>

        {/* Signup Buttons */}
        <div className="space-y-4 w-full">
          <button className="w-full bg-[#1e1e1e] text-white font-semibold py-3 rounded-full shadow-lg hover:bg-[#333333] transition duration-300 flex gap-2 items-center justify-center" onClick={()=>{loginWithPopup({
            authorizationParams:{
              redirect_uri:"http://localhost:5173/"
            }
          })}} > 
          <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" className="w-5 h-5" /> Sign up with Google
          </button>
          <button className="w-full bg-[#1e1e1e] text-white font-semibold py-3 rounded-full shadow-lg flex items-center justify-center gap-2 hover:bg-[#333333] transition duration-300">
           <span className="text-white"> <Github /></span> Sign up with Github
          </button>

          <div className="flex items-center justify-center space-x-4">
            <span className="h-[1px] w-1/4 bg-gray-300"></span>
            <span className="text-gray-500 font-medium">or</span>
            <span className="h-[1px] w-1/4 bg-gray-300"></span>
          </div>

          <button className="w-full bg-white text-black font-semibold py-3 border border-gray-300 rounded-full shadow hover:bg-gray-100 transition duration-300">
            Create an account
          </button>
        </div>

        {/* Already have an account */}
        <div className="flex flex-col items-center space-y-4 w-full">
          <button className="text-[#E14f20] font-semibold  hover:text-[#b8321a] transition duration-200">
            Already have an account?
          </button>
          <button className="w-full bg-[#e14f20] text-white font-semibold py-3  rounded-full shadow  outline-none" onClick={()=>{SetLoginModal(true)}}>
           Sign in
          </button>
        </div>
      </div>
      
    </section>
  );
};

export default ProductSignup;

