import { asyncWrapper } from "../middlewares";
import { Response } from "express";
import { User } from "../models";
import sendToken from "../utils";
import {
	BadRequestError,
	UnauthenticatedError,
	UnauthorizedError,
} from "../errors";

export const signup = asyncWrapper(async (req: any, res: Response) => {
	const user = await User.create(req.body);
	sendToken(user, 201, res, "Successfully signed up.");
});

export const login = asyncWrapper(async (req: any, res: Response) => {
	const { email, password } = req.body;

	if (!(email && password))
		throw new BadRequestError("Email and password is required.");

	const user = await User.findOne({ email }).select("+password");
	if (!user) throw new UnauthenticatedError("Invalid Credentials!");

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) throw new UnauthorizedError("Invalid credentials!");

	sendToken(user, 200, res, "Successfully logged in");
});

export const logout = asyncWrapper(async (req: any, res: Response) => {
	res.status(200).json({ success: true, message: "Successfully logged out." });
});

export const getProfile = asyncWrapper(async (req: any, res: Response) => {
	res.status(200).json({ success: true, user: req.user });
});

export const updateProfile = asyncWrapper(async (req: any, res: Response) => {
	const { user, body } = req;
	await User.findByIdAndUpdate(user._id, body);
	res.status(200).json({ success: true, message: "Successfully Updated!" });
});
