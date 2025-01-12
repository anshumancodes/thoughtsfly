import { atom } from "recoil";

export const loginModalState = atom({
  key: "loginModalState",
  default: false,
});

export const LightOrDark = atom({
  key: "LightOrDark",
  default: localStorage.getItem("theme") || "light",
});