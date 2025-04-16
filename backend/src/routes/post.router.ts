import Router from "express";
const router = Router();
import { createPost,deletePost,fetchPostbyid,fetchUserallposts,fetchFeed } from "../controllers/post.controller.js";
import { jwtCheck,ExtractUserInfo } from "../middlewares/Auth.middleware.js";


router.route("/create").post(jwtCheck,ExtractUserInfo,createPost);
router.route("/delete/:id").delete(jwtCheck,deletePost);
router.route("/fetch/:postid").get(jwtCheck,fetchPostbyid);
router.route("/fetchuserPosts").get(jwtCheck,ExtractUserInfo,fetchUserallposts);
router.route("/fetchFeed").get(jwtCheck,fetchFeed)

export default router;