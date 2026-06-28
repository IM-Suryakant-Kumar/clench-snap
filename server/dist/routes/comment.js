"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.route("/").post(controllers_1.createComment).get(controllers_1.getComments);
router.route("/:id").get(controllers_1.getComment).patch(controllers_1.updateComment).delete(controllers_1.deleteComment);
exports.commentRouter = router;
