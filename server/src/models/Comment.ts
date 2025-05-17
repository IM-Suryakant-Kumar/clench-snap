import { Schema, model } from "mongoose";
import { IComment } from "../types";

const commentSchema = new Schema<IComment>(
	{
		post: { type: Schema.Types.ObjectId, ref: "Post" },
		author: { type: Schema.Types.ObjectId, ref: "User" },
		content: { type: String, required: [true, "content is required"] },
	},
	{ timestamps: true }
);

export const Comment = model<IComment>("Comment", commentSchema);
