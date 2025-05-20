import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUser } from "../types";

const userSchema = new Schema<IUser>(
	{
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
		followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
		followings: [{ type: Schema.Types.ObjectId, ref: "User" }],
		posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
	},
	{ timestamps: true }
);

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.createJWTToken = function () {
	return sign({ _id: this._id }, process.env.JWT_SECRET as string, {
		expiresIn: "5d",
	});
};

export const User = model<IUser>("User", userSchema);
