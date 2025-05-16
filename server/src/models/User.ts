import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUser } from "../types";

const UserSchema = new Schema<IUser>(
	{
		fullname: {
			type: String,
			required: [true, "fullname is required"],
			maxlength: 20,
			minlength: 3,
		},
		username: {
			type: String,
			required: [true, "username is required"],
			unique: true,
			maxlength: 20,
			minlength: 3,
		},
		email: {
			type: String,
			required: [true, "email is required"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "password is required"],
			select: false,
		},
		avatar: { type: String },
		bio: { type: String },
		website: { type: String },
		followers: [{ type: String, required: true }],
		followings: [{ type: String, required: true }],
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.createJWTToken = function () {
	return sign({ userId: this._id }, process.env.JWT_SECRET as string, {
		expiresIn: "5d",
	});
};

export default model<IUser | any>("User", UserSchema);
