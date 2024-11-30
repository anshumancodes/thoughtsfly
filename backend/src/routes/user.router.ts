import Router from "express";
import { userSignup } from "../controllers/user.controller.js";
import { upload } from "../middlewares/fileupload.middleware.js";
const router = Router();

router.route("/signup").get(upload.fields([{ name: "avatar" }, { name: "profileBanner" }]), userSignup);
router.route("/login").get((req, res) => {});
router.route("/logout").get((req, res) => {});
router.route("/profile").get((req, res) => {});



export default router;