import { Schema, model } from "mongoose";
import { IPost } from "../types";

const postSchema = new Schema<IPost>(
	{
		author: { type: Schema.Types.ObjectId, ref: "User" },
		content: { type: String, required: [true, "content is required"] },
		image: { type: String, default: "" },
    liked: [{ type: Schema.Types.ObjectId, ref: "User" }],
    saved: [{ type: Schema.Types.ObjectId, ref: "User" }],
		comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
	},
	{ timestamps: true }
);

export const Post = model<IPost>("Post", postSchema);
