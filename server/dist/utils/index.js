"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendToken = (user, statusCode, res, message) => {
    const token = user.createJWTToken();
    res.status(statusCode).json({ success: true, message, token });
};
exports.default = sendToken;
