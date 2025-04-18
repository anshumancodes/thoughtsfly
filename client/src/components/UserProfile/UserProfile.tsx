import { ArrowLeft } from "lucide-react";
import TabNavigation from "./TabNavigation";
import Post from "../Timeline/Post";
import { Link, useParams } from "react-router-dom";
import { EditProfileModalState, UserProfileInfo } from "../../context/Atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import EditProfileModal from "./EditProfileModal";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { fetchUserDetails } from "../../services/UserDataService";
import axios from "axios";

const UserProfile = () => {
  const { username } = useParams();

  const setEditProfileModalState = useSetRecoilState(EditProfileModalState);
  const EditProfileModalVisibility = useRecoilValue(EditProfileModalState);
  const [userProfile, setUserProfile] = useRecoilState(UserProfileInfo);
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  const [userposts, setUserposts] = useState([]);

  const fetchUserProfile = async () => {
    try {
      const token = await getAccessTokenSilently();
      const data = await fetchUserDetails(token, username || "");

      setUserProfile({
        fullName: data.data.name,
        username: data.data.username,
        avatar: data.data.avatar,
        profileBanner: data.data.profileBanner,
        Bio: data.data.profileBio,
        location: data.data.location,
        followers: data.data.followers || 0,
        following: data.data.following || 0,
        posts: data.data.posts || 0,
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const fetchUserPosts = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        "http://localhost:8001/api/v1/post/fetchUserPosts",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("userposts", response);
      setUserposts(response.data.data.allPostsbyUser);
    } catch (error) {
      console.log("unable to fetch user's posts", error);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && username) {
      fetchUserProfile();
      fetchUserPosts();
    }
  }, [isLoading, isAuthenticated, username]);

  return (
    <div className="max-w-screen-sm mx-auto shadow-sm md:border-r border-gray-500 md:h-screen">
      <div className="flex p-4 border-b flex-col">
        <div className="flex gap-2">
          <Link to="/home" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">{userProfile.fullName}</h1>
        </div>

        <div className="ml-8 px-4 pb-2">
          <p className="text-sm text-gray-500">{userProfile.posts} posts</p>
        </div>
      </div>

      {/* Banner and Profile Picture */}
      <div className="relative">
        <img
          src={
            userProfile.profileBanner ||
            "https://i.pinimg.com/736x/49/5f/e7/495fe7750b161e168c129110310836f2.jpg"
          }
          alt="Banner"
          className="w-full object-cover"
        />
        <img
          src={
            userProfile.avatar ||
            "https://pbs.twimg.com/profile_images/1855841395329617920/764Jlajm_400x400.jpg"
          }
          alt="Profile"
          className="absolute -bottom-10 left-4 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white"
        />
      </div>

      {/* User Details */}
      <div className="px-4 pt-12 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{userProfile.fullName}</h2>
            <p className="text-gray-500">@{userProfile.username}</p>
          </div>
          <button
            className="px-4 py-1 border rounded-full border-gray-500 flex items-center justify-center"
            onClick={() => setEditProfileModalState(true)}
          >
            Edit Profile
          </button>
        </div>
        {EditProfileModalVisibility && <EditProfileModal />}
        <div className="mt-4">
          <p className="text-sm">{userProfile.Bio || ""}</p>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <p>
              <span className="font-semibold">{userProfile.following}</span>{" "}
              following
            </p>
            <p>
              <span className="font-semibold">{userProfile.followers}</span>{" "}
              followers
            </p>
          </div>
          {userProfile.location && (
            <p className="mt-2 text-sm text-gray-600">
              <span>📍 {userProfile.location}</span>
            </p>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <TabNavigation />

      {/* User Posts */}
      <div className="border-t ">
        <div className="overflow-y-auto max-h-[45vh] hide-scrollbar">
          {userposts.length > 0 ? (
            userposts.map((postdata) => (
              <Post  data={postdata} />
            ))
          ) : (
            <p className="text-gray-500 flex w-full justify-center mt-10">
              No posts found
            </p>
          )}
        </div>  
      </div>
    </div>
  );
};

export default UserProfile;
