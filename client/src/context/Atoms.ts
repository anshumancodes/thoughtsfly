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