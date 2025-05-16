import { Response } from "express";
import { Post } from "../models";
import { asyncWrapper } from "../middlewares";

export const getAllPosts = async (req: any, res: Response) => {
	const posts = await Post.find();
	res.status(200).json({ success: true, posts });
};

export const createPost = asyncWrapper(async (req: any, res: Response) => {
	const {
		user: { _id, fullname, avatar },
	} = req;

	await Post.create({
		userId: _id,
		userName: fullname,
		avatar,
		...req.body,
	});

	const posts = await Post.find();

	res.status(200).json({
		success: true,
		message: "Successfully posted",
		posts,
	});
});

export const editPost = asyncWrapper(async (req: any, res: Response) => {
	const {
		user: { _id },
	} = req;

	await Post.findByIdAndUpdate(req.body._id, req.body, {
		new: true,
	});

	const posts = await Post.find();

	res.status(200).json({
		success: true,
		message: "Successfully updated",
		posts,
	});
});

export const deletePost = asyncWrapper(async (req: any, res: Response) => {
	const {
		params: { postId },
	} = req;

	await Post.findByIdAndDelete(postId, {
		new: true,
	});

	const posts = await Post.find();

	res.status(200).json({
		success: true,
		message: "Successfully deleted",
		posts,
	});
});
