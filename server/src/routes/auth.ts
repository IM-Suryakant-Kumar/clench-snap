import { Router } from "express";
import {
	getProfile,
	login,
	logout,
	signup,
	updateProfile,
} from "../controllers";
import { authenticateUser } from "../middlewares";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(authenticateUser, logout);
router
	.route("/me")
	.get(authenticateUser, getProfile)
	.patch(authenticateUser, updateProfile);

export const authRouter = router;
