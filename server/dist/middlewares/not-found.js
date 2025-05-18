"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const notFoundMiddleware = (req, res) => {
    res.status(404).json({ success: false, message: "Route does not exist!" });
};
exports.notFoundMiddleware = notFoundMiddleware;
