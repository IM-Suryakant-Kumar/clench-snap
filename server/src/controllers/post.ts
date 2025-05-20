import { Response } from "express";
import { Post } from "../models";
import { IRequest } from "../types";

export const createPost = async (req: IRequest, res: Response) => {
	await Post.create({ ...req.body, author: req.user?._id });
	res.status(201).json({ success: true, message: "Successfully posted." });
};

export const getPosts = async (req: IRequest, res: Response) => {
	const posts = await Post.find();
	res.status(200).json({ success: true, posts });
};

export const getPost = async (req: IRequest, res: Response) => {
	const post = await Post.findById(req.params.id);
	res.status(200).json({ success: true, post });
};

export const updatePost = async (req: IRequest, res: Response) => {
	await Post.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({ success: true, message: "Successfully updated post." });
};

export const deletePost = async (req: IRequest, res: Response) => {
	await Post.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, message: "Successfully deleted post." });
};
