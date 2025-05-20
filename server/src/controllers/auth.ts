import { Response } from "express";
import { User } from "../models";
import sendToken from "../utils";
import {
	BadRequestError,
	UnauthenticatedError,
	UnauthorizedError,
} from "../errors";
import { IRequest } from "../types";

export const signup = async (req: IRequest, res: Response) => {
	const user = await User.create(req.body);
	sendToken(user, 201, res, "Signed up successfully.");
};

export const login = async (req: IRequest, res: Response) => {
	const { email, password } = req.body;

	if (!(email && password))
		throw new BadRequestError("Please provide email and password.");

	const user = await User.findOne({ email }).select("+password");
	if (!user) throw new UnauthenticatedError("Invalid Credentials!");

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) throw new UnauthorizedError("Invalid credentials!");

	sendToken(user, 200, res, "Logged in successfully.");
};

export const logout = async (req: IRequest, res: Response) => {
	res.status(200).json({ success: true, message: "Logged out successfully." });
};

export const getProfile = async (req: IRequest, res: Response) => {
	res.status(200).json({ success: true, user: req.user });
};

export const updateProfile = async (req: IRequest, res: Response) => {
	const { user, body } = req;
	await User.findByIdAndUpdate(user?._id, body);
	res.status(200).json({ success: true, message: "Updated successfully." });
};
