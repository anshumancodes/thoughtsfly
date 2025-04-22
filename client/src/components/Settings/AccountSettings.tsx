import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom"; 
import { UserProfileInfo } from "../../context/Atoms";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { fetchUserDetails } from "../../services/UserDataService";


interface UpdateDetailFormProps {
  value: string;
  onUsernameChange: (value: string) => void;
  onSubmit: () => void;
}

const UpdateDetailForm = ({
  value,
  onUsernameChange,
  onSubmit,
}: UpdateDetailFormProps) => {
  return (
    <div className="absolute top-20 left-0 right-0 bg-white shadow-md p-4 z-50 rounded-md">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="newUserName"
          placeholder={value}
          defaultValue={value}
          className="w-full border-2 border-gray-400 px-4 py-2 rounded-md outline-none"
          onChange={(e) => onUsernameChange(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
            onClick={() => onSubmit()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

const AccountSettings = () => {
  const [userProfile, setUserProfile] = useRecoilState(UserProfileInfo);
  const [updateForm, setUpdateForm] = useState(false);
  const [username, setUsername] = useState(userProfile.username);

  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  
  const [error, Seterror] = useState();

  const fetchAccountDetails = async () => {
    try {
      const username = localStorage.getItem("username")?.toString();
      const token = await getAccessTokenSilently();
      const data=await fetchUserDetails(token, username);
      setUserProfile({
        fullName: data.data.name,
        username: data.data.username,
        email:data.data.email,
        avatar: data.data.avatar,
        profileBanner: data.data.profileBanner,
        Bio: data.data.profileBio,
        location: data.data.location,
        followers: data.data.followers || 0,
        following: data.data.following || 0,
        posts: data.data.posts || 0,
      });
    } catch (error:any) {
     Seterror(error)
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated ) {
     fetchAccountDetails()
    }
  }, [isLoading, isAuthenticated]); 
  const handleUpdate = async () => {
    try {
      const token = await getAccessTokenSilently();
      await axios.patch(
        "http://localhost:8001/api/v1/user/update/username",
        { newUsername: username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Close the form after successful update
      setUpdateForm(false);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 relative">
      {/* Header */}
      <div className="border-b pb-3 mb-4">
        <Link to="/home">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <ChevronLeft size={20} />
            Account Settings
          </h2>
        </Link>
      </div>

      {/* Account Setting Sections */}
      <div className="space-y-6">
        <div className="bg-red-500">{error}</div>
        {/* Username Section */}
        <div className="flex justify-between items-center border-b pb-3 relative">
          <div>
            <p className="text-gray-500 text-sm">Username</p>
            <p className="font-medium text-base text-gray-700">
              {userProfile.username}
            </p>
          </div>
          <button
            className="text-blue-500 hover:underline text-sm"
            onClick={() => setUpdateForm(!updateForm)}
          >
            {updateForm ? "Cancel" : "Change"}
          </button>
          {updateForm && (
            <UpdateDetailForm
              value={userProfile.username}
              onUsernameChange={setUsername}
              onSubmit={handleUpdate}
            />
          )}
        </div>

        {/* Email Section */}
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium text-base text-gray-700">
              {userProfile.email}
            </p>
          </div>
          <button className="text-blue-500 hover:underline text-sm">
            Change
          </button>
        </div>

        {/* Location Section */}
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <p className="text-gray-500 text-sm">Location</p>
            <p className="font-medium text-base text-gray-700">
              {userProfile.location || "India"}
            </p>
          </div>
          <button className="text-blue-500 hover:underline text-sm">
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
