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
exports.updateProfile = exports.getProfile = exports.logout = exports.login = exports.signup = void 0;
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
const utils_1 = __importDefault(require("../utils"));
const errors_1 = require("../errors");
exports.signup = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.create(req.body);
    (0, utils_1.default)(user, 201, res, "Successfully signed up.");
}));
exports.login = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!(email && password))
        throw new errors_1.BadRequestError("Email and password is required.");
    const user = yield models_1.User.findOne({ email }).select("+password");
    if (!user)
        throw new errors_1.UnauthenticatedError("Invalid Credentials!");
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect)
        throw new errors_1.UnauthorizedError("Invalid credentials!");
    (0, utils_1.default)(user, 200, res, "Successfully logged in");
}));
exports.logout = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ success: true, message: "Successfully logged out." });
}));
exports.getProfile = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ success: true, user: req.user });
}));
exports.updateProfile = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, body } = req;
    yield models_1.User.findByIdAndUpdate(user._id, body);
    res.status(200).json({ success: true, message: "Successfully Updated!" });
}));
