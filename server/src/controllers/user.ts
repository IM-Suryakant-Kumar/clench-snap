import { Response } from "express";
import { User } from "../models";
import { asyncWrapper } from "../middlewares";

// get logged-in user
export const getLoggedInUser = asyncWrapper(async (req: any, res: Response) => {
	const {
		user: { _id },
	} = req;

	const user = await User.findById(_id);
	res.status(200).json({ success: true, user });
});

export const updateUser = asyncWrapper(async (req: any, res: Response) => {
	const {
		user: { _id },
		body,
	} = req;

	await User.findByIdAndUpdate(req.body._id, body, {
		new: true,
	});

	const user = await User.findById(_id);
	const users = await User.find();

	res.status(200).json({
		success: true,
		message: "Successfully Updated!",
		user,
		users,
	});
});

export const getAllusers = asyncWrapper(async (req: any, res: Response) => {
	const users = await User.find();
	res.status(200).json({ success: true, users });
});
