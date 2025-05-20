import { Request } from "express";

export interface IUser {
  _id: string;
	name: string;
	username: string;
	email: string;
	password: string;
	avatar?: string;
	bio?: string;
	website?: string;
	followers?: IUser[];
	followings?: IUser[];
	posts?: IPost[];

	comparePassword(candidatePassword: string): Promise<boolean>;
	createJWTToken(): string;
}

export interface IPost {
	author: IUser;
	content: string;
	image?: string;
	liked?: IPost[];
	saved?: IPost[];
	comments?: IComment[];
}

export interface IComment {
	post: IPost;
	author: IUser;
	content: string;
}

export interface IRequest extends Request {
	params: { id: string };
	body: IUser & IPost & IComment;
	user?: IUser;
}
