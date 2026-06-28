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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: [
            3,
            "Name should not be less than 3 greater than 20 characters.",
        ],
        maxlength: [
            20,
            "Name should not be less than 3 greater than 20 characters.",
        ],
    },
    username: {
        type: String,
        required: [true, "Please provide username."],
        minlength: [
            3,
            "Username should not be less than 3 greater than 20 characters.",
        ],
        maxlength: [
            20,
            "Username should not be less than 3 greater than 20 characters.",
        ],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: [3, "Password should not be less than 3 characters."],
        select: false,
    },
    avatar: { type: String },
    bio: { type: String },
    website: { type: String },
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    followings: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Post" }],
}, { timestamps: true });
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return;
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
    });
});
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(candidatePassword, this.password);
    });
};
userSchema.methods.createJWTToken = function () {
    return (0, jsonwebtoken_1.sign)({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
    });
};
exports.User = (0, mongoose_1.model)("User", userSchema);
