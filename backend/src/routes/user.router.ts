import Router from "express";
import { userSignup,fetchUserProfile, userLogin,HandleAuthOsignup } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { jwtCheck } from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/signup").post(upload.fields([{ name: "avatar" }, { name: "profileBanner" }]), userSignup);
router.route("/login").post(userLogin);
router.route("/logout").get((req, res) => {});
router.route("/profile/:username").get(jwtCheck,fetchUserProfile);


// auth0 routes

router.route("/auth0/signup").post(jwtCheck,HandleAuthOsignup);
export default router;