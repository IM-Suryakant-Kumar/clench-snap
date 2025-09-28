import { Response } from "express";
import { Comment, Post } from "../models";
import { IRequest } from "../types";

export const createComment = async (req: IRequest, res: Response) => {
	const comment = await Comment.create({ ...req.body, author: req.user?._id });
  await Post.findByIdAndUpdate(req.body.post, {
    $push: { comments: comment._id }
  });
	res.status(201).json({ success: true, message: "Successfully Commented" });
};

export const getComments = async (req: IRequest, res: Response) => {
	const comments = await Comment.find();
	res.status(200).json({ success: true, comments });
};

export const getComment = async (req: IRequest, res: Response) => {
	const comment = await Comment.findById(req.params.id);
	res.status(200).json({ success: true, comment });
};

export const updateComment = async (req: IRequest, res: Response) => {
	await Comment.findByIdAndUpdate(req.params.id, req.body);
	res
		.status(200)
		.json({ success: true, message: "Successfully updated Comment" });
};

export const deleteComment = async (req: IRequest, res: Response) => {
	const comment = await Comment.findByIdAndDelete(req.params.id);
  await Post.findByIdAndUpdate(comment?.post, {
    $pull: { comments: req.params.id }
  });
	res
		.status(200)
		.json({ success: true, message: "Successfully deleted Comment" });
};
