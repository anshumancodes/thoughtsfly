import { atom } from "recoil";

export const loginModalState = atom({
  key: "loginModalState",
  default: false,
});

export const LightOrDark = atom({
  key: "LightOrDark",
  default: localStorage.getItem("theme") || "light",
});

export const ContentTabState=atom({
  key:"FeedContentSelector",
  default:"for-you"
});

export const activeTabState = atom({
  key: "activeTabState", // Unique key for this atom
  default: "Posts", // Default value for the active tab
});

export const CreatePostModalState = atom({
  key: "CreatePostModalState",
  default: false,
});

export const ExploreTabNavigationState=atom({
  key:"ExploreTabNavigationState",
  default:"For You"
})

export const UpVoteState=atom({
  key:"UpVoteState",
  default:false
})

export const UpVoteCountState=atom({
  key:"UpVoteCountState",
  default:0
})

export const EditProfileModalState=atom({
  key:"EditProfileModalState",
  default:false
})

export const isSettingson=atom({
  key:"isSettingstabopen",
  default:false
})

export const UserProfileInfo = atom({
  key: "UserInfoState",
  default: {
    fullName: "",
    username: "",
    avatar: "",
    profileBanner: "",
    Bio: "",
    location: "",
    followers: 0,
    following: 0,
    posts: 0
  }
});

export const userState = atom({
  key: 'userState',
  default: {
    username: null,
  },
});


export const postContent=atom({
  key:"postContentState",
  default:{
    content:"",
    Name:"fullName",
    username:"@username",
    likes:0,
    commentCount:0,
    RepostCount:0,
    LikeCount:0,





  }
})