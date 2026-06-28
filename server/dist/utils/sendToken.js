"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendToken = (user, statusCode, res, message) => {
    const token = user.createJWTToken();
    const COOKIE_LIFETIME = parseInt(process.env.COOKIE_LIFETIME, 10);
    res.cookie("token", token, {
        maxAge: COOKIE_LIFETIME * 24 * 60 * 60 * 1000,
        httpOnly: true
    })
        .status(statusCode)
        .json({ success: true, message, token });
};
exports.default = sendToken;
//# sourceMappingURL=sendToken.js.map