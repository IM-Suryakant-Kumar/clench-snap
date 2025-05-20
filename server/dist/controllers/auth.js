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
const models_1 = require("../models");
const utils_1 = __importDefault(require("../utils"));
const errors_1 = require("../errors");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.create(req.body);
    (0, utils_1.default)(user, 201, res, "Signed up successfully.");
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!(email && password))
        throw new errors_1.BadRequestError("Please provide email and password.");
    const user = yield models_1.User.findOne({ email }).select("+password");
    if (!user)
        throw new errors_1.UnauthenticatedError("Invalid Credentials!");
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect)
        throw new errors_1.UnauthorizedError("Invalid credentials!");
    (0, utils_1.default)(user, 200, res, "Logged in successfully.");
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ success: true, message: "Logged out successfully." });
});
exports.logout = logout;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ success: true, user: req.user });
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, body } = req;
    yield models_1.User.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, body);
    res.status(200).json({ success: true, message: "Updated successfully." });
});
exports.updateProfile = updateProfile;
