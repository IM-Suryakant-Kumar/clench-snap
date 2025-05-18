"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.route("/signup").post(controllers_1.signup);
router.route("/login").post(controllers_1.login);
router.route("/logout").get(middlewares_1.authenticateUser, controllers_1.logout);
router
    .route("/me")
    .get(middlewares_1.authenticateUser, controllers_1.getProfile)
    .patch(middlewares_1.authenticateUser, controllers_1.updateProfile);
exports.authRouter = router;
