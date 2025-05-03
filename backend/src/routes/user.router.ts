import Router from "express";
import { userSignup,fetchUserProfile, userLogin,HandleAuthOsignup,EditUserProfile,changeUsername } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { jwtCheck ,ExtractUserInfo} from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/signup").post(upload.fields([{ name: "avatar" }, { name: "profileBanner" }]), userSignup);
router.route("/login").post(userLogin);
router.route("/logout").get((req, res) => {});
router.route("/profile/:username").get(jwtCheck,fetchUserProfile);
router.route("/update/username").patch(jwtCheck,ExtractUserInfo,changeUsername)


// auth0 routes

router.route("/auth0/signup").post(jwtCheck,HandleAuthOsignup);
export default router;