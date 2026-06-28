"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newReq = req;
    let { token } = newReq.cookies;
    // check header
    const authHeader = req.headers.authorization;
    if (!token && !(authHeader && authHeader.startsWith("Bearer")))
        throw new errors_1.UnauthenticatedError("Authentication failed!");
    !token && (token = authHeader.split(" ")[1]);
    if (token === "null")
        throw new errors_1.UnauthenticatedError("Authentication failed!");
    const JWT_SECRET = process.env.JWT_SECRET;
    const { _id } = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    newReq.user = yield models_1.User.findById(_id);
    next();
});
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=authentication.js.map