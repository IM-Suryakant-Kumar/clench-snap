import { Router } from "express";
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from "../controllers";
const router = Router();

router.route("/").post(createUser).get(getUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export const userRouter = router;
