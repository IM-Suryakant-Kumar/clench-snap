import { asyncWrapper } from "../middlewares";
import { Response } from "express";
import { Post } from "../models";

export const createPost = asyncWrapper(async (req: any, res: Response) => {
	await Post.create({ author: req.user._id, ...req.body });
	res.status(201).json({ success: true, message: "Successfully posted" });
});

export const getPosts = async (req: any, res: Response) => {
	const posts = await Post.find();
	res.status(200).json({ success: true, posts });
};

export const getPost = async (req: any, res: Response) => {
	const post = await Post.findById(req.params.id);
	res.status(200).json({ success: true, post });
};

export const updatePost = asyncWrapper(async (req: any, res: Response) => {
	await Post.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({ success: true, message: "Successfully updated post" });
});

export const deletePost = asyncWrapper(async (req: any, res: Response) => {
	await Post.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, message: "Successfully deleted post" });
});
