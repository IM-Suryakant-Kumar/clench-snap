import { asyncWrapper } from "../middlewares";
import { Response } from "express";
import { User } from "../models";

export const createUser = asyncWrapper(async (req: any, res: Response) => {
	await User.create(req.body);
	res.status(201).json({ success: true, message: "Successfully Usered" });
});

export const getUsers = async (req: any, res: Response) => {
	const users = await User.find();
	res.status(200).json({ success: true, users });
};

export const getUser = async (req: any, res: Response) => {
	const user = await User.findById(req.params.id);
	res.status(200).json({ success: true, user });
};

export const updateUser = asyncWrapper(async (req: any, res: Response) => {
	await User.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({ success: true, message: "Successfully updated User" });
});

export const deleteUser = asyncWrapper(async (req: any, res: Response) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, message: "Successfully deleted User" });
});
