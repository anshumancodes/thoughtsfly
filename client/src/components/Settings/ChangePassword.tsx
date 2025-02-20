
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
const ChangePassword = () => {
    return (
      <div className="max-w-[500px]">
        {/* Header */}
        <div className="border-b pb-3 mb-4">
        <Link to={"/home"}>  <h2 className="text-xl font-bold flex gap-3"> <ChevronLeft/>Change Password</h2></Link> 
        </div>
  
        {/* Password Change Form */}
        <form className="space-y-4">
          {/* Old Password */}
          <div>
            <label className="block text-gray-500 text-sm mb-1">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          {/* New Password */}
          <div>
            <label className="block text-gray-500 text-sm mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          {/* Submit Button */}
          <button className="w-full bg-[#E14F20] text-white py-2 rounded-full font-semibold hover:bg-[#f8612f] transition">
            Change Password
          </button>
        </form>
      </div>
    );
  };
  
  export default ChangePassword;
  