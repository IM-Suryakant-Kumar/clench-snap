import { Schema, model } from "mongoose";
import { IPost } from "../types";

const PostSchema = new Schema<IPost>(
	{
		userId: { type: String, required: true },
		userName: { type: String, required: true },
		avatar: { type: String, required: true },
		content: { type: String, required: true },
		image: { type: String, default: "" },
		liked: [{ type: String, required: true }],
		saved: [{ type: String, required: true }],
		comments: [
			{
				userName: { type: String, required: true },
				avatar: { type: String, required: true },
				content: { type: String, required: true },
			},
		],
	},
	{ timestamps: true }
);

export default model<IPost>("Post", PostSchema);
