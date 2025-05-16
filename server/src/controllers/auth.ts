import { Response } from "express";
import {
	BadRequestError,
	UnauthenticatedError,
	UnauthorizedError,
} from "../errors";
import { User } from "../models";
import sendToken from "../utils";
import { asyncWrapper } from "../middlewares";

// Create User
export const createUser = asyncWrapper(async (req: any, res: Response) => {
	const {
		body: { fullname, username, email, password },
	} = req;

	if (!(fullname && username && email && password))
		throw new BadRequestError("Please provide all values");

	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new BadRequestError("Email is already exists");
	}

	const user = await User.create({ fullname, username, email, password });
	sendToken(user, 200, res, "Successfully registered");
});
// Login user
export const login = asyncWrapper(async (req: any, res: Response) => {
	const {
		body: { email, password },
	} = req;

	if (!(email && password))
		throw new BadRequestError("Please provide all values");

	const user = await User.findOne({ email }).select("+password");
	if (!user) throw new UnauthenticatedError("Invalid Credentials!");

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) throw new UnauthorizedError("Invalid credentials!");

	sendToken(user, 200, res, "Successfully logged in");
});
// guest login
export const guestLogin = asyncWrapper(async (req: any, res: Response) => {
	const user = await User.findOne({ email: "clenchsnap@gmail.com" }).select(
		"+password"
	);
	if (!user) throw new UnauthenticatedError("Invalid Credentials!");

	const isPasswordCorrect = await user.comparePassword("secret");
	if (!isPasswordCorrect) throw new UnauthorizedError("Invalid credentials!");

	sendToken(user, 200, res, "Successfully logged in");
});
// Logout user
export const logout = asyncWrapper(async (req: any, res: Response) => {
	res.status(200).json({ success: true, message: "Logged out successfully!" });
});
