"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const mongoose_1 = require("mongoose");
const errorHandlerMiddleware = (err, req, res, next) => {
    const customError = {
        statusCode: err.statusCode || 500,
        message: err.message || "Something went wrong try again.",
    };
    if (err instanceof mongoose_1.Error.ValidationError) {
        customError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(",");
        customError.statusCode = 400;
    }
    if (err instanceof mongoose_1.Error.CastError) {
        customError.message = `Invalid Id format.`;
        customError.statusCode = 404;
    }
    if (err.name === "MongoServerError" && err.code === 11000) {
        customError.message = `${Object.keys(err.keyValue)} is already exists.`;
        customError.statusCode = 409;
    }
    res.status(customError.statusCode).json({
        success: false,
        message: customError.message,
        err
    });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
