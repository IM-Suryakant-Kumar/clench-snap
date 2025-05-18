"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.UnauthenticatedError = void 0;
const custom_api_1 = require("./custom-api");
class UnauthenticatedError extends custom_api_1.CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
class UnauthorizedError extends custom_api_1.CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 403;
    }
}
exports.UnauthorizedError = UnauthorizedError;
