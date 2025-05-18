"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.route("/").post(controllers_1.createUser).get(controllers_1.getUsers);
router.route("/:id").get(controllers_1.getUser).patch(controllers_1.updateUser).delete(controllers_1.deleteUser);
exports.userRouter = router;
