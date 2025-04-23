import Router from "express";
import { jwtCheck,ExtractUserInfo } from "../middlewares/Auth.middleware.js";
import { DeleteLike,CreateLike } from "../controllers/like.controller.js";
const router = Router();

router.route("/create").post(jwtCheck,ExtractUserInfo,CreateLike);
router.route("/delete").post(jwtCheck,ExtractUserInfo,DeleteLike);


export default router;
