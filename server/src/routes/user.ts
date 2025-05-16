import { Router } from "express";
import { getAllusers, getLoggedInUser, updateUser } from "../controllers/user";
import { authenticateUser } from "../middlewares";

const router = Router();

router
	.route("/me")
	.get(authenticateUser, getLoggedInUser)
	.patch(authenticateUser, updateUser);

router.route("/").get(getAllusers);

export const userRouter = router;
