import Router from "express";
const router = Router();
import { createPost,deletePost,fetchPostbyid } from "../controllers/post.controller.js";
import { jwtCheck } from "../middlewares/Auth.middleware.js";


router.route("/create").post(jwtCheck,createPost);
router.route("/delete/:id").delete(jwtCheck,deletePost);
router.route("/:postid").get(jwtCheck,fetchPostbyid)

export default router;