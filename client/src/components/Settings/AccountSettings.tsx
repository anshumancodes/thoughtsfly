import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

const AccountSettings = () => {
    return (
      <div className="max-w-[600px] mx-auto p-4">
        {/* Header */}
        <div className="border-b pb-3 mb-4">
        <Link to={"/home"}>  <h2 className="text-xl font-bold flex gap-3"> <ChevronLeft/> Account Settings</h2></Link>
        </div>
  
        {/* Account Setting Sections */}
        <div className="space-y-6">
          {/* Username Section */}
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <p className="text-gray-500 text-sm">Username</p>
              <p className="font-medium text-lg">@usernamehere</p>
            </div>
            <button className="text-blue-500 hover:underline text-sm">Change</button>
          </div>
  
          {/* Email Section */}
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium text-lg">email@example.com</p>
            </div>
            <button className="text-blue-500 hover:underline text-sm">Change</button>
          </div>
  
          {/* Location Section */}
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="font-medium text-lg">United States</p>
            </div>
            <button className="text-blue-500 hover:underline text-sm">Change</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default AccountSettings;
  