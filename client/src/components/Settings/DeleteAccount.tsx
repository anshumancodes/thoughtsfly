
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const DeleteAccount = () => {
    return (
      <div className="max-w-[500px] ">

        <div className="border-b pb-3 mb-4">
         <Link to={"/home"}> <h2 className="text-xl font-bold text-red-600 flex gap-2"><p className="text-black"><ChevronLeft/></p>Delete Account</h2></Link>
        </div>
  
        {/* Warning Message */}
        <div className="bg-red-100 text-red-700 p-3 rounded-md">
          <p className="text-sm">
            <strong>Warning:</strong> Deleting your account is permanent and cannot be undone.
            All your data, including your posts and followers, will be lost.
          </p>
        </div>
  
       
        <div className="mt-4">
          <label className="block text-gray-500 text-sm mb-1">
            Type <span className="font-bold">"DELETE"</span> to confirm:
          </label>
          <input
            type="text"
            placeholder="Type DELETE to confirm"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
  
        
        <button className="w-full bg-red-600 text-white py-2 rounded-full font-semibold hover:bg-red-700 transition mt-4">
          Delete Account
        </button>
      </div>
    );
  };
  
  export default DeleteAccount;
  