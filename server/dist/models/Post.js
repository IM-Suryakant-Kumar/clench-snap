"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide author."],
    },
    content: { type: String, required: [true, "Please provide content."] },
    image: { type: String },
    liked: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    saved: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true });
exports.Post = (0, mongoose_1.model)("Post", postSchema);
