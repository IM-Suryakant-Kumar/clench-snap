import { asyncWrapper } from "../middlewares";
import { Response } from "express";
import { Comment } from "../models";

export const createComment = asyncWrapper(async (req: any, res: Response) => {
	await Comment.create({ author: req.user._id, ...req.body });
	res.status(201).json({ success: true, message: "Successfully Commented" });
});

export const getComments = async (req: any, res: Response) => {
	const comments = await Comment.find();
	res.status(200).json({ success: true, comments });
};

export const getComment = async (req: any, res: Response) => {
	const comment = await Comment.findById(req.params.id);
	res.status(200).json({ success: true, comment });
};

export const updateComment = asyncWrapper(async (req: any, res: Response) => {
	await Comment.findByIdAndUpdate(req.params.id, req.body);
	res
		.status(200)
		.json({ success: true, message: "Successfully updated Comment" });
});

export const deleteComment = asyncWrapper(async (req: any, res: Response) => {
	await Comment.findByIdAndDelete(req.params.id);
	res
		.status(200)
		.json({ success: true, message: "Successfully deleted Comment" });
});
