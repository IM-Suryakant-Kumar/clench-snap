"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.route("/").post(controllers_1.createPost).get(controllers_1.getPosts);
router.route("/:id").get(controllers_1.getPost).patch(controllers_1.updatePost).delete(controllers_1.deletePost);
exports.postRouter = router;
