import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from "../controllers";

const router = Router();

router.route("/").post(createComment).get(getComments);
router.route("/:id").get(getComment).patch(updateComment).delete(deleteComment);

export const commentRouter = router;
