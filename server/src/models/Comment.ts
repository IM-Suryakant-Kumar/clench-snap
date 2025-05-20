import { Schema, model } from "mongoose";
import { IComment } from "../types";

const commentSchema = new Schema<IComment>(
	{
		post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
			required: [true, "Please provide post"],
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide author"],
		},
		content: { type: String, required: [true, "content is required"] },
	},
	{ timestamps: true }
);

export const Comment = model<IComment>("Comment", commentSchema);
