import { Response } from "express";
import { User } from "../models";
import { IRequest } from "../types";

export const createUser = async (req: IRequest, res: Response) => {
	await User.create(req.body);
	res
		.status(201)
		.json({ success: true, message: "Created User successfully!" });
};

export const getUsers = async (req: IRequest, res: Response) => {
	const users = await User.find();
	res.status(200).json({ success: true, users });
};

export const getUser = async (req: IRequest, res: Response) => {
	const user = await User.findById(req.params.id);
	res.status(200).json({ success: true, user });
};

export const updateUser = async (req: IRequest, res: Response) => {
	await User.findByIdAndUpdate(req.params.id, req.body);
	res
		.status(200)
		.json({ success: true, message: "Updated User successfully!" });
};

export const deleteUser = async (req: IRequest, res: Response) => {
	await User.findByIdAndDelete(req.params.id);
	res
		.status(200)
		.json({ success: true, message: "deleted User successfully!" });
};
